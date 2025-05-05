import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainerUser } from '../models/user.model';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = '/api/trainers';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<TrainerUser> {
    return this.http.get<TrainerUser>(`${this.apiUrl}/profile`);
  }

  updateProfile(profile: Partial<TrainerUser>): Observable<TrainerUser> {
    return this.http.put<TrainerUser>(`${this.apiUrl}/profile`, profile);
  }

  updateAvailability(isAvailable: boolean): Observable<TrainerUser> {
    return this.http.patch<TrainerUser>(`${this.apiUrl}/availability`, { isAvailable });
  }

  getAvailableTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/available-trainings`);
  }

  applyForTraining(trainingId: string): Observable<Training> {
    return this.http.post<Training>(`${this.apiUrl}/trainings/${trainingId}/apply`, {});
  }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings`);
  }
}