import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyUser } from '../models/user.model';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = '/api/companies';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<CompanyUser> {
    return this.http.get<CompanyUser>(`${this.apiUrl}/profile`);
  }

  updateProfile(profile: Partial<CompanyUser>): Observable<CompanyUser> {
    return this.http.put<CompanyUser>(`${this.apiUrl}/profile`, profile);
  }

  postTraining(training: Partial<Training>): Observable<Training> {
    return this.http.post<Training>(`${this.apiUrl}/trainings`, training);
  }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings`);
  }

  getAvailableTrainers(skills?: string[]): Observable<any[]> {
    const params = skills ? { skills: skills.join(',') } : {};
    return this.http.get<any[]>(`${this.apiUrl}/available-trainers`, { params });
  }

  assignTrainer(trainingId: string, trainerId: string): Observable<Training> {
    return this.http.patch<Training>(
      `${this.apiUrl}/trainings/${trainingId}/assign`,
      { trainerId }
    );
  }
}