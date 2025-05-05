import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TrainingService } from '../../../core/services/training.service';
import { TrainerUser } from '../../../core/models/user.model';
import { Training, TrainingApplication } from '../../../core/models/training.model';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']  
})
export class TrainerDashboardComponent implements OnInit {
  trainer: TrainerUser | null = null;
  trainings: Training[] = [];
  applications: TrainingApplication[] = [];
  
  constructor(
    private authService: AuthService,
    private trainingService: TrainingService
  ) {}
  
  ngOnInit(): void {
    // Get the current logged in trainer
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'trainer') {
      this.trainer = user as TrainerUser;
      
      // Get trainings for this trainer
      this.trainingService.getTrainingsByTrainer(this.trainer.id).subscribe(trainings => {
        this.trainings = trainings;
      });
      
      // Get applications for this trainer
      this.trainingService.getApplicationsByTrainer(this.trainer.id).subscribe(applications => {
        this.applications = applications;
      });
      
      // Get available trainings that match this trainer's skills
      if (this.trainer.skills && this.trainer.skills.length > 0) {
        this.trainingService.getAvailableTrainings(this.trainer.skills).subscribe(trainings => {
          // Filter out trainings that the trainer has already applied for
          const appliedTrainingIds = this.applications.map(app => app.trainingId);
          const availableTrainings = trainings.filter(training => !appliedTrainingIds.includes(training.id));
          this.trainings = [...this.trainings, ...availableTrainings];
        });
      }
    }
  }
  
  getCurrentTrainings(): Training[] {
    return this.trainings.filter(training => 
      training.trainerId === this.trainer?.id && 
      (training.status === 'assigned' || training.status === 'ongoing')
    );
  }
  
  getCompletedTrainings(): Training[] {
    return this.trainings.filter(training => 
      training.trainerId === this.trainer?.id && training.status === 'completed'
    );
  }
  
  getAvailableTrainings(): Training[] {
    return this.trainings.filter(training => training.status === 'open');
  }
  
  hasSkill(skill: string): boolean {
    return this.trainer?.skills.includes(skill) || false;
  }
  
  getSkillMatchPercentage(training: Training): number {
    if (!this.trainer || !training.requiredSkills || training.requiredSkills.length === 0) {
      return 0;
    }
    
    const matchedSkills = training.requiredSkills.filter(skill => this.trainer!.skills.includes(skill));
    return Math.round((matchedSkills.length / training.requiredSkills.length) * 100);
  }
}