import { Component, HostListener  } from '@angular/core';

import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { PopupsService } from 'src/app/shared/services/popups.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  formLogin: FormGroup;
  hide = true;
  matcher = new MyErrorStateMatcher();
  isLoginUser= false;

  constructor(
    private userService: UserService,
    private router: Router,
    private popupsService: PopupsService
  ) { 
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
   }


  //EVENT ENTER
  @HostListener('document:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }

  //INICIO SESION
  onSubmit() {
    this.isLoginUser= true;
    this.userService.login(this.formLogin.value)
    .then(response => {
      this.isLoginUser= false;
      this.popupsService.openSnackBar('Bienvenido', 'x', 3000, 'right', 'top');
      this.router.navigate(['/main']);
    })
    .catch(error => {
      this.isLoginUser= false;
      this.popupsService.openSnackBar('Mail o Contraseña incorrecta', 'x', 2500, 'right', 'top');
    });
  }

  //GOOGLE
  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        this.router.navigate(['/main']);
      })
      .catch(error => {})
  }

}


