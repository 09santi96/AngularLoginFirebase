
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, 
    ForgotPasswordRoutingModule, 
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class ForgotPasswordModule {


}