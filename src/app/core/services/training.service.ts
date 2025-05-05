import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Training, TrainingApplication } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private mockTrainings: Training[] = [
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Training on advanced React concepts including hooks, context API, and performance optimization.',
      requiredSkills: ['React', 'JavaScript', 'Redux'],
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-03-15'),
      location: 'Remote',
      budget: 10000,
      status: 'open',
      companyId: '1',
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-05')
    },
    {
      id: '2',
      title: 'Full Stack Development with MEAN',
      description: 'Comprehensive training on MongoDB, Express.js, Angular, and Node.js stack.',
      requiredSkills: ['Angular', 'Node.js', 'MongoDB', 'Express.js'],
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-04-15'),
      location: 'Onsite - San Francisco',
      budget: 15000,
      status: 'assigned',
      companyId: '1',
      vendorId: '2',
      trainerId: '3',
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-15')
    },
    {
      id: '3',
      title: 'DevOps and CI/CD Pipeline',
      description: 'Training on DevOps practices, tools, and implementing CI/CD pipelines.',
      requiredSkills: ['DevOps', 'Docker', 'Kubernetes', 'Jenkins'],
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-05-15'),
      location: 'Hybrid',
      budget: 12000,
      status: 'ongoing',
      companyId: '1',
      vendorId: '2',
      trainerId: '3',
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-02-01')
    }
  ];
  
  private mockApplications: TrainingApplication[] = [
    {
      id: '1',
      trainingId: '1',
      trainerId: '3',
      status: 'pending',
      createdAt: new Date('2025-01-10')
    },
    {
      id: '2',
      trainingId: '2',
      trainerId: '3',
      status: 'accepted',
      notes: 'Perfect match for our requirements',
      createdAt: new Date('2025-01-12')
    }
  ];
  
  constructor() { }
  
  getTrainings(): Observable<Training[]> {
    return of(this.mockTrainings);
  }
  
  getTrainingById(id: string): Observable<Training | undefined> {
    return of(this.mockTrainings.find(training => training.id === id));
  }
  
  getTrainingsByCompany(companyId: string): Observable<Training[]> {
    return of(this.mockTrainings.filter(training => training.companyId === companyId));
  }
  
  getTrainingsByVendor(vendorId: string): Observable<Training[]> {
    return of(this.mockTrainings.filter(training => training.vendorId === vendorId));
  }
  
  getTrainingsByTrainer(trainerId: string): Observable<Training[]> {
    return of(this.mockTrainings.filter(training => training.trainerId === trainerId));
  }
  
  getAvailableTrainings(skills: string[]): Observable<Training[]> {
    return of(this.mockTrainings.filter(training => 
      training.status === 'open' && 
      training.requiredSkills.some(skill => skills.includes(skill))
    ));
  }
  
  createTraining(training: Partial<Training>): Observable<Training> {
    const newTraining: Training = {
      id: Math.random().toString(36).substr(2, 9),
      title: training.title!,
      description: training.description!,
      requiredSkills: training.requiredSkills!,
      startDate: training.startDate!,
      endDate: training.endDate!,
      location: training.location!,
      budget: training.budget!,
      status: 'open',
      companyId: training.companyId!,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockTrainings.push(newTraining);
    return of(newTraining);
  }
  
  updateTraining(id: string, updates: Partial<Training>): Observable<Training | undefined> {
    const index = this.mockTrainings.findIndex(training => training.id === id);
    if (index !== -1) {
      this.mockTrainings[index] = { 
        ...this.mockTrainings[index], 
        ...updates,
        updatedAt: new Date()
      };
      return of(this.mockTrainings[index]);
    }
    return of(undefined);
  }
  
  applyForTraining(trainingId: string, trainerId: string): Observable<TrainingApplication> {
    const newApplication: TrainingApplication = {
      id: Math.random().toString(36).substr(2, 9),
      trainingId,
      trainerId,
      status: 'pending',
      createdAt: new Date()
    };
    
    this.mockApplications.push(newApplication);
    return of(newApplication);
  }
  
  getApplicationsByTrainer(trainerId: string): Observable<TrainingApplication[]> {
    return of(this.mockApplications.filter(app => app.trainerId === trainerId));
  }
  
  getApplicationsByTraining(trainingId: string): Observable<TrainingApplication[]> {
    return of(this.mockApplications.filter(app => app.trainingId === trainingId));
  }
  
  updateApplicationStatus(
    applicationId: string, 
    status: 'pending' | 'accepted' | 'rejected', 
    notes?: string
  ): Observable<TrainingApplication | undefined> {
    const index = this.mockApplications.findIndex(app => app.id === applicationId);
    if (index !== -1) {
      this.mockApplications[index] = {
        ...this.mockApplications[index],
        status,
        notes
      };
      
      // If application is accepted, update the training
      if (status === 'accepted') {
        const application = this.mockApplications[index];
        const trainingIndex = this.mockTrainings.findIndex(t => t.id === application.trainingId);
        if (trainingIndex !== -1) {
          this.mockTrainings[trainingIndex] = {
            ...this.mockTrainings[trainingIndex],
            status: 'assigned',
            trainerId: application.trainerId,
            updatedAt: new Date()
          };
        }
      }
      
      return of(this.mockApplications[index]);
    }
    return of(undefined);
  }
}