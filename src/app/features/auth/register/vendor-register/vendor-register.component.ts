import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-vendor-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="container">
        <div class="register-wrapper">
          <div class="card auth-card fade-in">
            <h2>Register as Vendor</h2>
            <p class="mb-6">Create an account to manage trainers and provide training services</p>
            
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="vendorName">Vendor Company Name</label>
                <input
                  type="text"
                  id="vendorName"
                  formControlName="vendorName"
                  placeholder="Your vendor name"
                  class="form-input"
                  [class.error]="isFieldInvalid('vendorName')"
                >
                <div *ngIf="isFieldInvalid('vendorName')" class="error-message">
                  Vendor name is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  placeholder="vendor@example.com"
                  class="form-input"
                  [class.error]="isFieldInvalid('email')"
                >
                <div *ngIf="isFieldInvalid('email')" class="error-message">
                  Please enter a valid email address
                </div>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  formControlName="phone"
                  placeholder="(123) 456-7890"
                  class="form-input"
                  [class.error]="isFieldInvalid('phone')"
                >
                <div *ngIf="isFieldInvalid('phone')" class="error-message">
                  Please enter a valid phone number
                </div>
              </div>
              
              <div class="form-group">
                <label for="address">Address</label>
                <input
                  type="text"
                  id="address"
                  formControlName="address"
                  placeholder="Vendor address"
                  class="form-input"
                  [class.error]="isFieldInvalid('address')"
                >
                <div *ngIf="isFieldInvalid('address')" class="error-message">
                  Address is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="licenseNumber">Vendor License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  formControlName="licenseNumber"
                  placeholder="e.g. VEN12345"
                  class="form-input"
                  [class.error]="isFieldInvalid('licenseNumber')"
                >
                <div *ngIf="isFieldInvalid('licenseNumber')" class="error-message">
                  License number is required
                </div>
              </div>
              
              <div class="form-group">
                <label for="specializations">Areas of Specialization</label>
                <select
                  id="specializations"
                  formControlName="specializations"
                  multiple
                  class="form-input"
                  [class.error]="isFieldInvalid('specializations')"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="IoT">IoT</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Other">Other</option>
                </select>
                <div *ngIf="isFieldInvalid('specializations')" class="error-message">
                  Please select at least one specialization
                </div>
              </div>
              
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  formControlName="password"
                  placeholder="Create a password"
                  class="form-input"
                  [class.error]="isFieldInvalid('password')"
                >
                <div *ngIf="isFieldInvalid('password')" class="error-message">
                  Password must be at least 8 characters
                </div>
              </div>
              
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  placeholder="Confirm your password"
                  class="form-input"
                  [class.error]="isFieldInvalid('confirmPassword')"
                >
                <div *ngIf="isFieldInvalid('confirmPassword')" class="error-message">
                  Passwords do not match
                </div>
              </div>
              
              <div *ngIf="errorMessage" class="alert-error mb-4">
                {{ errorMessage }}
              </div>
              
              <button type="submit" class="btn btn-secondary w-full" [disabled]="registerForm.invalid || isLoading">
                <span *ngIf="isLoading">Registering...</span>
                <span *ngIf="!isLoading">Register</span>
              </button>
            </form>
            
            <div class="auth-divider">
              <span>Already have an account?</span>
            </div>
            
            <a routerLink="/login" class="btn btn-outline w-full">Log In</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: calc(100vh - 10rem);
      display: flex;
      align-items: center;
      padding: var(--space-8) 0;
      background-color: var(--neutral-50);
    }
    
    .register-wrapper {
      max-width: 580px;
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
      color: var(--secondary-700);
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
      border-color: var(--secondary-400);
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
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
    
    select[multiple] {
      height: 8rem;
    }
  `]
})
export class VendorRegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      vendorName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$|^\d{10}$|^\d{3}-\d{3}-\d{4}$/)]],
      address: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      specializations: [[], Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.router.navigate([`/dashboard/${user.role}`]);
      }
    }
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ notMatching: true });
      return { notMatching: true };
    }
    
    return null;
  }
  
  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return (control?.invalid && control?.touched) as boolean;
  }
  
  onSubmit(): void {
    if (this.registerForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const formValue = this.registerForm.value;
    
    this.authService.registerVendor({
      vendorName: formValue.vendorName,
      email: formValue.email,
      phone: formValue.phone,
      address: formValue.address,
      licenseNumber: formValue.licenseNumber,
      specializations: formValue.specializations
    }).subscribe({
      next: () => {
        this.isLoading = false;
        // After registration, log user in
        this.authService.login(formValue.email, formValue.password).subscribe({
          next: () => {
            this.router.navigate(['/dashboard/vendor']);
          },
          error: (error) => {
            this.errorMessage = 'Registration successful but login failed. Please try logging in.';
            this.router.navigate(['/login']);
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      }
    });
  }
}