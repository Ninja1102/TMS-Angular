import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TrainingService } from '../../../core/services/training.service';
import { VendorUser, TrainerUser } from '../../../core/models/user.model';
import { Training } from '../../../core/models/training.model';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']  
})
export class VendorDashboardComponent implements OnInit {
  vendor: VendorUser | null = null;
  trainings: Training[] = [];
  trainers: TrainerUser[] = [
    {
      id: '3',
      email: 'john@example.com',
      role: 'trainer',
      fullName: 'John Smith',
      phone: '555-123-4567',
      address: '789 Trainer Blvd, Skill City',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: 5,
      preferredLocation: 'hybrid',
      dailyRate: 500,
      isAvailable: true,
      vendorId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      email: 'jane@example.com',
      role: 'trainer',
      fullName: 'Jane Doe',
      phone: '555-987-6543',
      address: '456 Expertise St, Talent Town',
      skills: ['Python', 'Django', 'Data Science', 'Machine Learning'],
      experience: 7,
      preferredLocation: 'remote',
      dailyRate: 600,
      isAvailable: true,
      vendorId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      email: 'mark@example.com',
      role: 'trainer',
      fullName: 'Mark Johnson',
      phone: '555-456-7890',
      address: '123 Code Ave, Dev City',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
      experience: 10,
      preferredLocation: 'onsite',
      dailyRate: 800,
      isAvailable: false,
      vendorId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  constructor(
    private authService: AuthService,
    private trainingService: TrainingService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Get the current logged in vendor
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'vendor') {
      this.vendor = user as VendorUser;
      
      // Get trainings for this vendor
      this.trainingService.getTrainingsByVendor(this.vendor.id).subscribe(trainings => {
        this.trainings = trainings;
      });
    }
  }
  
  getTrainingsByStatus(status: string): Training[] {
    return this.trainings.filter(training => training.status === status);
  }
  
  getAvailableTrainers(): TrainerUser[] {
    return this.trainers.filter(trainer => trainer.isAvailable);
  }
  
  getTrainerInitials(trainer: TrainerUser): string {
    const nameParts = trainer.fullName.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0].charAt(0) + nameParts[1].charAt(0);
    }
    return nameParts[0].charAt(0);
  }
}