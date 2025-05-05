export type TrainingStatus = 'open' | 'assigned' | 'ongoing' | 'completed' | 'cancelled';

export interface Training {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  startDate: Date;
  endDate: Date;
  location: string;
  budget: number;
  status: TrainingStatus;
  companyId: string;
  vendorId?: string;
  trainerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingApplication {
  id: string;
  trainingId: string;
  trainerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  notes?: string;
  createdAt: Date;
}