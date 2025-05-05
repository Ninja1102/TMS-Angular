import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="container">
        <div class="login-wrapper">
          <div class="card auth-card fade-in">
            <h2>Log In</h2>
            <p class="mb-6">Welcome back! Please enter your credentials to access your account.</p>
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  placeholder="your.email@example.com"
                  class="form-input"
                  [class.error]="isFieldInvalid('email')"
                >
                <div *ngIf="isFieldInvalid('email')" class="error-message">
                  Please enter a valid email address
                </div>
              </div>
              
              <div class="form-group">
                <div class="flex justify-between items-center mb-1">
                  <label for="password">Password</label>
                  <a routerLink="/forgot-password" class="text-sm">Forgot Password?</a>
                </div>
                <input
                  type="password"
                  id="password"
                  formControlName="password"
                  placeholder="Enter your password"
                  class="form-input"
                  [class.error]="isFieldInvalid('password')"
                >
                <div *ngIf="isFieldInvalid('password')" class="error-message">
                  Password is required
                </div>
              </div>
              
              <div *ngIf="errorMessage" class="alert-error mb-4">
                {{ errorMessage }}
              </div>
              
              <button type="submit" class="btn btn-primary w-full" [disabled]="loginForm.invalid || isLoading">
                <span *ngIf="isLoading">Loading...</span>
                <span *ngIf="!isLoading">Log In</span>
              </button>
            </form>
            
            <div class="auth-divider">
              <span>New to our platform?</span>
            </div>
            
            <div class="register-options">
              <a routerLink="/register/company" class="btn btn-outline-company">Register as Company</a>
              <a routerLink="/register/vendor" class="btn btn-outline-vendor">Register as Vendor</a>
              <a routerLink="/register/trainer" class="btn btn-outline-trainer">Register as Trainer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: calc(100vh - 10rem);
      display: flex;
      align-items: center;
      padding: var(--space-8) 0;
      background-color: var(--neutral-50);
    }
    
    .login-wrapper {
      max-width: 480px;
      margin: 0 auto;
    }
    
    .auth-card {
      background-color: white;
      padding: var(--space-8);
    }
    
    .auth-card h2 {
      font-size: 1.75rem;
      margin-bottom: var(--space-2);
      text-align: center;
    }
    
    .auth-card p {
      text-align: center;
      color: var(--neutral-600);
    }
    
    .form-input {
      width: 100%;
      padding: var(--space-3);
      border: 1px solid var(--neutral-300);
      border-radius: var(--radius-md);
      font-size: 1rem;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }
    
    .form-input:focus {
      border-color: var(--primary-400);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      outline: none;
    }
    
    .form-input.error {
      border-color: var(--error-500);
    }
    
    .error-message {
      color: var(--error-600);
      font-size: 0.875rem;
      margin-top: var(--space-1);
    }
    
    .alert-error {
      background-color: var(--error-50);
      border: 1px solid var(--error-200);
      color: var(--error-700);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
    }
    
    .w-full {
      width: 100%;
    }
    
    .auth-divider {
      position: relative;
      text-align: center;
      margin: var(--space-6) 0;
    }
    
    .auth-divider:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--neutral-200);
    }
    
    .auth-divider span {
      position: relative;
      background-color: white;
      padding: 0 var(--space-2);
      color: var(--neutral-500);
      font-size: 0.875rem;
    }
    
    .register-options {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-3);
    }
    
    .btn-outline-company,
    .btn-outline-vendor,
    .btn-outline-trainer {
      display: block;
      padding: var(--space-2);
      text-align: center;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      border: 1px solid;
      font-weight: 500;
    }
    
    .btn-outline-company {
      border-color: var(--primary-300);
      color: var(--primary-700);
    }
    
    .btn-outline-company:hover {
      background-color: var(--primary-50);
      text-decoration: none;
    }
    
    .btn-outline-vendor {
      border-color: var(--secondary-300);
      color: var(--secondary-700);
    }
    
    .btn-outline-vendor:hover {
      background-color: var(--secondary-50);
      text-decoration: none;
    }
    
    .btn-outline-trainer {
      border-color: var(--accent-300);
      color: var(--accent-700);
    }
    
    .btn-outline-trainer:hover {
      background-color: var(--accent-50);
      text-decoration: none;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.router.navigate([`/dashboard/${user.role}`]);
      }
    }
  }
  
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return (control?.invalid && control?.touched) as boolean;
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.isLoading = false;
        // Navigate to the appropriate dashboard based on user role
        this.router.navigate([`/dashboard/${user.role}`]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Invalid email or password. Please try again.';
      }
    });
  }
}