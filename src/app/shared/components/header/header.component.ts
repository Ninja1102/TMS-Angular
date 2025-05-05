import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <h1>TMS<span>.</span></h1>
            </a>
          </div>
          
          <nav class="nav">
            <ng-container *ngIf="!currentUser">
              <a routerLink="/" class="nav-link">Home</a>
              <a routerLink="/login" class="btn btn-outline">Log In</a>
              <a routerLink="/register/company" class="btn btn-primary">Register</a>
            </ng-container>
            
            <ng-container *ngIf="currentUser">
              <a [routerLink]="getDashboardLink()" class="nav-link">Dashboard</a>
              
              <div class="user-menu">
                <button class="user-button">
                  <span class="avatar">{{ getUserInitials() }}</span>
                  <span class="user-name">{{ getUserDisplayName() }}</span>
                </button>
                
                <div class="user-dropdown">
                  <a [routerLink]="getDashboardLink()" class="dropdown-item">Dashboard</a>
                  <a [routerLink]="getDashboardLink() + '/profile'" class="dropdown-item">Profile</a>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item text-error" (click)="logout()">Log Out</button>
                </div>
              </div>
            </ng-container>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: white;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: background-color var(--transition-normal);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
    }
    
    .logo a {
      text-decoration: none;
    }
    
    .logo h1 {
      font-family: var(--font-heading);
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-700);
      margin: 0;
    }
    
    .logo h1 span {
      color: var(--accent-500);
    }
    
    .nav {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }
    
    .nav-link {
      font-weight: 500;
      color: var(--neutral-700);
      transition: color var(--transition-fast);
    }
    
    .nav-link:hover {
      color: var(--primary-600);
      text-decoration: none;
    }
    
    .user-menu {
      position: relative;
    }
    
    .user-button {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-md);
      background-color: var(--neutral-50);
      border: 1px solid var(--neutral-200);
      cursor: pointer;
    }
    
    .user-button:hover {
      background-color: var(--neutral-100);
    }
    
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      background-color: var(--primary-100);
      color: var(--primary-700);
      border-radius: 50%;
      font-weight: 600;
    }
    
    .user-name {
      font-weight: 500;
    }
    
    .user-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background-color: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      min-width: 12rem;
      padding: var(--space-2) 0;
      display: none;
    }
    
    .user-menu:hover .user-dropdown {
      display: block;
      animation: fadeIn 0.2s ease-out;
    }
    
    .dropdown-item {
      display: block;
      padding: var(--space-2) var(--space-4);
      color: var(--neutral-700);
      transition: background-color var(--transition-fast);
      cursor: pointer;
      text-decoration: none;
    }
    
    .dropdown-item:hover {
      background-color: var(--neutral-50);
      text-decoration: none;
    }
    
    .dropdown-divider {
      height: 1px;
      background-color: var(--neutral-200);
      margin: var(--space-2) 0;
    }
    
    .text-error {
      color: var(--error-600);
    }
    
    .text-error:hover {
      background-color: var(--error-50);
    }
    
    @media (max-width: 768px) {
      .user-name {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  
  getUserInitials(): string {
    if (!this.currentUser) return '';
    
    if (this.currentUser.role === 'company') {
      const company = this.currentUser as any;
      return company.companyName.charAt(0);
    } else if (this.currentUser.role === 'vendor') {
      const vendor = this.currentUser as any;
      return vendor.vendorName.charAt(0);
    } else {
      const trainer = this.currentUser as any;
      const nameParts = trainer.fullName.split(' ');
      if (nameParts.length > 1) {
        return nameParts[0].charAt(0) + nameParts[1].charAt(0);
      }
      return nameParts[0].charAt(0);
    }
  }
  
  getUserDisplayName(): string {
    if (!this.currentUser) return '';
    
    if (this.currentUser.role === 'company') {
      return (this.currentUser as any).companyName;
    } else if (this.currentUser.role === 'vendor') {
      return (this.currentUser as any).vendorName;
    } else {
      return (this.currentUser as any).fullName;
    }
  }
  
  getDashboardLink(): string {
    if (!this.currentUser) return '/';
    return `/dashboard/${this.currentUser.role}`;
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}