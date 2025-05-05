import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h2>TMS<span>.</span></h2>
            <p>Connecting companies with expert trainers through quality vendors.</p>
          </div>
          
          <div class="footer-links">
            <div class="link-group">
              <h4>For Companies</h4>
              <a routerLink="/register/company">Register as Company</a>
              <a routerLink="/services/companies">Find Trainers</a>
              <a routerLink="/services/companies">Post Training Requirements</a>
            </div>
            
            <div class="link-group">
              <h4>For Vendors</h4>
              <a routerLink="/register/vendor">Register as Vendor</a>
              <a routerLink="/services/vendors">Manage Trainers</a>
              <a routerLink="/services/vendors">Training Solutions</a>
            </div>
            
            <div class="link-group">
              <h4>For Trainers</h4>
              <a routerLink="/register/trainer">Register as Trainer</a>
              <a routerLink="/services/trainers">Find Training Opportunities</a>
              <a routerLink="/services/trainers">Develop Your Profile</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 Training Management System. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a routerLink="/privacy">Privacy Policy</a>
            <a routerLink="/terms">Terms of Service</a>
            <a routerLink="/contact">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-800);
      color: var(--neutral-200);
      padding: var(--space-10) 0 var(--space-6);
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--space-8);
      margin-bottom: var(--space-8);
    }
    
    .footer-logo h2 {
      font-size: 1.75rem;
      color: white;
      margin-bottom: var(--space-2);
    }
    
    .footer-logo h2 span {
      color: var(--accent-500);
    }
    
    .footer-logo p {
      color: var(--neutral-400);
      max-width: 300px;
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
    }
    
    .link-group h4 {
      color: white;
      margin-bottom: var(--space-4);
      font-size: 1.125rem;
    }
    
    .link-group a {
      display: block;
      color: var(--neutral-400);
      margin-bottom: var(--space-2);
      transition: color var(--transition-fast);
    }
    
    .link-group a:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-bottom {
      padding-top: var(--space-6);
      border-top: 1px solid var(--neutral-700);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-bottom p {
      margin-bottom: 0;
      color: var(--neutral-500);
    }
    
    .footer-bottom-links {
      display: flex;
      gap: var(--space-4);
    }
    
    .footer-bottom-links a {
      color: var(--neutral-400);
      font-size: 0.875rem;
      transition: color var(--transition-fast);
    }
    
    .footer-bottom-links a:hover {
      color: white;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
      
      .footer-links {
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }
      
      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
      }
    }
  `]
})
export class FooterComponent {}