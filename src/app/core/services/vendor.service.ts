import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorUser, TrainerUser } from '../models/user.model';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = '/api/vendors';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<VendorUser> {
    return this.http.get<VendorUser>(`${this.apiUrl}/profile`);
  }

  updateProfile(profile: Partial<VendorUser>): Observable<VendorUser> {
    return this.http.put<VendorUser>(`${this.apiUrl}/profile`, profile);
  }

  getTrainers(): Observable<TrainerUser[]> {
    return this.http.get<TrainerUser[]>(`${this.apiUrl}/trainers`);
  }

  associateTrainer(trainerId: string): Observable<TrainerUser> {
    return this.http.post<TrainerUser>(`${this.apiUrl}/trainers/${trainerId}`, {});
  }

  updateTrainerAvailability(trainerId: string, isAvailable: boolean): Observable<TrainerUser> {
    return this.http.patch<TrainerUser>(
      `${this.apiUrl}/trainers/${trainerId}/availability`,
      { isAvailable }
    );
  }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings`);
  }
}