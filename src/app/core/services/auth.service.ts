import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, AuthResponse, CompanyUser, VendorUser, TrainerUser, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth'; // Would be replaced with actual API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }
  
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }
  
  login(email: string, password: string): Observable<User> {
    // For demo purposes, we're simulating a successful login
    // This would be replaced with an actual API call
    return of(this.simulateLogin(email)).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      }),
      map(response => response.user),
      catchError(error => throwError(() => new Error('Login failed')))
    );
  }
  
  // Simulates login for demo purposes
  private simulateLogin(email: string): AuthResponse {
    let user: User;
    
    if (email.includes('company')) {
      user = {
        id: '1',
        email,
        role: 'company',
        companyName: 'Tech Solutions Inc.',
        phone: '123-456-7890',
        address: '123 Main St, Tech City',
        industries: ['Software', 'AI'],
        createdAt: new Date(),
        updatedAt: new Date()
      } as CompanyUser;
    } else if (email.includes('vendor')) {
      user = {
        id: '2',
        email,
        role: 'vendor',
        vendorName: 'Training Experts LLC',
        phone: '987-654-3210',
        address: '456 Training Ave, Edu City',
        licenseNumber: 'VEN12345',
        specializations: ['Web Development', 'Cloud Computing'],
        createdAt: new Date(),
        updatedAt: new Date()
      } as VendorUser;
    } else {
      user = {
        id: '3',
        email,
        role: 'trainer',
        fullName: 'John Smith',
        phone: '555-123-4567',
        address: '789 Trainer Blvd, Skill City',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: 5,
        preferredLocation: 'hybrid',
        dailyRate: 500,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as TrainerUser;
    }
    
    return {
      user,
      token: 'dummy-jwt-token'
    };
  }
  
  registerCompany(company: Partial<CompanyUser>): Observable<CompanyUser> {
    // This would be replaced with an actual API call
    return of({
      id: Math.random().toString(36).substr(2, 9),
      email: company.email!,
      role: 'company',
      companyName: company.companyName!,
      phone: company.phone!,
      address: company.address!,
      website: company.website,
      industries: company.industries!,
      createdAt: new Date(),
      updatedAt: new Date()
    } as CompanyUser);
  }
  
  registerVendor(vendor: Partial<VendorUser>): Observable<VendorUser> {
    // This would be replaced with an actual API call
    return of({
      id: Math.random().toString(36).substr(2, 9),
      email: vendor.email!,
      role: 'vendor',
      vendorName: vendor.vendorName!,
      phone: vendor.phone!,
      address: vendor.address!,
      licenseNumber: vendor.licenseNumber!,
      specializations: vendor.specializations!,
      createdAt: new Date(),
      updatedAt: new Date()
    } as VendorUser);
  }
  
  registerTrainer(trainer: Partial<TrainerUser>): Observable<TrainerUser> {
    // This would be replaced with an actual API call
    return of({
      id: Math.random().toString(36).substr(2, 9),
      email: trainer.email!,
      role: 'trainer',
      fullName: trainer.fullName!,
      phone: trainer.phone!,
      address: trainer.address!,
      skills: trainer.skills!,
      experience: trainer.experience!,
      preferredLocation: trainer.preferredLocation!,
      dailyRate: trainer.dailyRate!,
      resumeUrl: trainer.resumeUrl,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as TrainerUser);
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  hasRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }
}