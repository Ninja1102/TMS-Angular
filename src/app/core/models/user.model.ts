export type UserRole = 'company' | 'vendor' | 'trainer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyUser extends User {
  role: 'company';
  companyName: string;
  phone: string;
  address: string;
  website?: string;
  industries: string[];
}

export interface VendorUser extends User {
  role: 'vendor';
  vendorName: string;
  phone: string;
  address: string;
  licenseNumber: string;
  specializations: string[];
}

export interface TrainerUser extends User {
  role: 'trainer';
  fullName: string;
  phone: string;
  address: string;
  skills: string[];
  experience: number;
  preferredLocation: 'remote' | 'onsite' | 'hybrid';
  dailyRate: number;
  resumeUrl?: string;
  isAvailable: boolean;
  vendorId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}