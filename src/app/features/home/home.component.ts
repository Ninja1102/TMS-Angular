import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="slide-up">Training Management <span>Simplified</span></h1>
              <p class="slide-up">Connect companies with expert trainers through trusted vendors - all in one platform.</p>
              <div class="hero-buttons slide-up">
                <a routerLink="/register/company" class="btn btn-primary">I'm a Company</a>
                <a routerLink="/register/vendor" class="btn btn-secondary">I'm a Vendor</a>
                <a routerLink="/register/trainer" class="btn btn-accent">I'm a Trainer</a>
              </div>
            </div>
            <div class="hero-image fade-in">
              <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Training Management System" />
            </div>
          </div>
        </div>
      </section>
      
      <section class="features">
        <div class="container">
          <h2 class="section-title">How It Works</h2>
          
          <div class="feature-cards">
            <div class="card feature-card">
              <div class="feature-icon company-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3>For Companies</h3>
              <p>Post training requirements, search for qualified trainers or vendors, and manage ongoing trainings efficiently.</p>
              <a routerLink="/register/company" class="btn btn-outline">Get Started</a>
            </div>
            
            <div class="card feature-card">
              <div class="feature-icon vendor-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3>For Vendors</h3>
              <p>Manage trainers, assign them to trainings, and build a reputation for delivering quality training programs.</p>
              <a routerLink="/register/vendor" class="btn btn-outline">Get Started</a>
            </div>
            
            <div class="card feature-card">
              <div class="feature-icon trainer-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3>For Trainers</h3>
              <p>Showcase your skills, find relevant training opportunities, and manage your availability and schedules.</p>
              <a routerLink="/register/trainer" class="btn btn-outline">Get Started</a>
            </div>
          </div>
        </div>
      </section>
      
      <section class="stats">
        <div class="container">
          <div class="stats-container">
            <div class="stat-item">
              <h2>500+</h2>
              <p>Companies</p>
            </div>
            <div class="stat-item">
              <h2>200+</h2>
              <p>Vendors</p>
            </div>
            <div class="stat-item">
              <h2>2,500+</h2>
              <p>Trainers</p>
            </div>
            <div class="stat-item">
              <h2>5,000+</h2>
              <p>Trainings Completed</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="testimonials">
        <div class="container">
          <h2 class="section-title">What Our Users Say</h2>
          
          <div class="testimonial-cards">
            <div class="card testimonial-card">
              <div class="testimonial-content">
                <p>"This platform revolutionized how we find and manage trainers. The quality of talent and ease of use is unmatched."</p>
              </div>
              <div class="testimonial-author">
                <img src="https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Jane Cooper" />
                <div>
                  <h4>Jane Cooper</h4>
                  <p>HR Director, Tech Innovations</p>
                </div>
              </div>
            </div>
            
            <div class="card testimonial-card">
              <div class="testimonial-content">
                <p>"As a vendor, we've expanded our trainer network and increased training assignments by 150% in just six months."</p>
              </div>
              <div class="testimonial-author">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Robert Fox" />
                <div>
                  <h4>Robert Fox</h4>
                  <p>CEO, Training Solutions Inc.</p>
                </div>
              </div>
            </div>
            
            <div class="card testimonial-card">
              <div class="testimonial-content">
                <p>"I've found consistent training opportunities that match my skills perfectly. My calendar is now fully booked months in advance."</p>
              </div>
              <div class="testimonial-author">
                <img src="https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Esther Howard" />
                <div>
                  <h4>Esther Howard</h4>
                  <p>Senior Trainer, Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to Transform Your Training Management?</h2>
            <p>Join thousands of companies, vendors, and trainers already using our platform.</p>
            <div class="cta-buttons">
              <a routerLink="/register/company" class="btn btn-primary">Register Now</a>
              <a routerLink="/login" class="btn btn-outline">Log In</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      overflow-x: hidden;
    }
    
    /* Hero Section */
    .hero {
      padding: var(--space-12) 0;
      background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
      align-items: center;
    }
    
    .hero-text h1 {
      font-size: 3.5rem;
      line-height: 1.1;
      margin-bottom: var(--space-4);
      color: var(--neutral-900);
    }
    
    .hero-text h1 span {
      color: var(--primary-700);
      position: relative;
      display: inline-block;
    }
    
    .hero-text h1 span:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 8px;
      width: 100%;
      background-color: var(--accent-300);
      z-index: -1;
      border-radius: var(--radius-sm);
    }
    
    .hero-text p {
      font-size: 1.25rem;
      color: var(--neutral-700);
      margin-bottom: var(--space-6);
    }
    
    .hero-buttons {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
    }
    
    .hero-image {
      position: relative;
    }
    
    .hero-image img {
      width: 100%;
      height: auto;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
    }
    
    /* Features Section */
    .features {
      padding: var(--space-16) 0;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-10);
      position: relative;
      display: inline-block;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .section-title:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -10px;
      width: 80px;
      height: 4px;
      background-color: var(--primary-500);
      transform: translateX(-50%);
      border-radius: var(--radius-md);
    }
    
    .feature-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
    }
    
    .feature-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      transition: transform var(--transition-normal);
    }
    
    .feature-card h3 {
      margin-top: var(--space-4);
      font-size: 1.5rem;
    }
    
    .feature-card p {
      color: var(--neutral-600);
      margin-bottom: var(--space-4);
      flex-grow: 1;
    }
    
    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-bottom: var(--space-2);
    }
    
    .company-icon {
      background-color: var(--primary-100);
      color: var(--primary-700);
    }
    
    .vendor-icon {
      background-color: var(--secondary-100);
      color: var(--secondary-700);
    }
    
    .trainer-icon {
      background-color: var(--accent-100);
      color: var(--accent-700);
    }
    
    /* Stats Section */
    .stats {
      padding: var(--space-12) 0;
      background-color: var(--neutral-900);
      color: white;
    }
    
    .stats-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-item h2 {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      margin-bottom: var(--space-2);
    }
    
    .stat-item p {
      font-size: 1.25rem;
      color: var(--neutral-300);
      margin-bottom: 0;
    }
    
    /* Testimonials Section */
    .testimonials {
      padding: var(--space-16) 0;
      background-color: var(--neutral-50);
    }
    
    .testimonial-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
    }
    
    .testimonial-card {
      display: flex;
      flex-direction: column;
    }
    
    .testimonial-content {
      flex-grow: 1;
      margin-bottom: var(--space-6);
    }
    
    .testimonial-content p {
      font-size: 1.125rem;
      line-height: 1.6;
      color: var(--neutral-700);
      font-style: italic;
      margin-bottom: 0;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .testimonial-author img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .testimonial-author h4 {
      font-size: 1rem;
      margin-bottom: 0;
    }
    
    .testimonial-author p {
      font-size: 0.875rem;
      color: var(--neutral-500);
      margin-bottom: 0;
    }
    
    /* CTA Section */
    .cta {
      padding: var(--space-16) 0;
      background: linear-gradient(135deg, var(--primary-600), var(--primary-800));
      color: white;
    }
    
    .cta-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .cta-content h2 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: var(--space-4);
    }
    
    .cta-content p {
      font-size: 1.25rem;
      color: var(--neutral-100);
      margin-bottom: var(--space-8);
    }
    
    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: var(--space-4);
    }
    
    .cta .btn-outline {
      border-color: white;
      color: white;
    }
    
    .cta .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .cta .btn-primary {
      background-color: white;
      color: var(--primary-700);
    }
    
    .cta .btn-primary:hover {
      background-color: var(--neutral-100);
    }
    
    /* Responsive Styles */
    @media (max-width: 1024px) {
      .hero-text h1 {
        font-size: 3rem;
      }
      
      .feature-cards, .testimonial-cards {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .stats-container {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-8) var(--space-4);
      }
    }
    
    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
      
      .hero-image {
        order: -1;
      }
      
      .hero-text h1 {
        font-size: 2.5rem;
      }
      
      .feature-cards, .testimonial-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}