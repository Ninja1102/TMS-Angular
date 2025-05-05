import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TrainingService } from '../../../core/services/training.service';
import { CompanyUser } from '../../../core/models/user.model';
import { Training } from '../../../core/models/training.model';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  company: CompanyUser | null = null;
  trainings: Training[] = [];
  
  constructor(
    private authService: AuthService,
    private trainingService: TrainingService
  ) {}
  
  ngOnInit(): void {
    // Get the current logged in company
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'company') {
      this.company = user as CompanyUser;
      
      // Get trainings for this company
      this.trainingService.getTrainingsByCompany(this.company.id).subscribe(trainings => {
        this.trainings = trainings;
      });
    }
  }
  
  getTrainingsByStatus(status: string): Training[] {
    return this.trainings.filter(training => training.status === status);
  }
}