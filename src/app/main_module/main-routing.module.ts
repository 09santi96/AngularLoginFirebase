import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { VeterinariosComponent } from './components/veterinarios/veterinarios.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';




const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'vets', component: VeterinariosComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'profiles', component: ProfilesComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'dashboard'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
