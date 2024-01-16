import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*components*/
import { LoginComponent } from './auth_module/components/login/login.component';
import { RegisterComponent } from './auth_module/components/register/register.component';
import { ForgotPasswordComponent } from './auth_module/components/forgot-password/forgot-password.component';
import { MainComponent } from './main_module/components/main/main.component';
import { MenuComponent } from './main_module/components/menu/menu.component';

import { ReactiveFormsModule } from '@angular/forms';

/*firebase*/
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material components
import { MaterialModule } from './shared/material.module';
/*PRIME FACES NG */
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MainComponent,
    MenuComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    MaterialModule,
    PanelMenuModule,
    provideFirestore(() => getFirestore())
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
