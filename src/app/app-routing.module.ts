import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

/*COMPONENTS*/
import { LoginComponent } from './auth_module/components/login/login.component';
import { RegisterComponent } from './auth_module/components/register/register.component';

import { MainComponent } from './main_module/components/main/main.component';
import { ForgotPasswordComponent } from './auth_module/components/forgot-password/forgot-password.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    children: [
      {
        path: '',
        loadChildren: () => import('./main_module/main.module')
        .then(module => module.MainModule)
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
