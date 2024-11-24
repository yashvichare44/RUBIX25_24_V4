import { Routes } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';

// Export the 'routes' so it can be imported elsewhere
export const routes: Routes = [
  { path: 'policies', component: PolicyComponent },
  { path: '', redirectTo: '/policies', pathMatch: 'full' },
  { path: '**', redirectTo: '/policies' },
];
