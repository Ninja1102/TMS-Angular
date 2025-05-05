import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CompanyRegisterComponent } from './features/auth/register/company-register/company-register.component';
import { VendorRegisterComponent } from './features/auth/register/vendor-register/vendor-register.component';
import { TrainerRegisterComponent } from './features/auth/register/trainer-register/trainer-register.component';
import { CompanyDashboardComponent } from './features/dashboard/company-dashboard/company-dashboard.component';
import { VendorDashboardComponent } from './features/dashboard/vendor-dashboard/vendor-dashboard.component';
import { TrainerDashboardComponent } from './features/dashboard/trainer-dashboard/trainer-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/company', component: CompanyRegisterComponent },
  { path: 'register/vendor', component: VendorRegisterComponent },
  { path: 'register/trainer', component: TrainerRegisterComponent },
  { 
    path: 'dashboard/company', 
    component: CompanyDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['company'] }
  },
  { 
    path: 'dashboard/vendor', 
    component: VendorDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['vendor'] }
  },
  { 
    path: 'dashboard/trainer', 
    component: TrainerDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['trainer'] }
  },
  { path: '**', redirectTo: '' }
];