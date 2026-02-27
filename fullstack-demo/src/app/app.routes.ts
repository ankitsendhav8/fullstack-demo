import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact-us',
        loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent)
    },
    {
        path: 'team',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent)
    },
    {
        path: 'login',
        canActivate: [LoginGuard],
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        canActivate: [LoginGuard],
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
    },

];
