import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupsService } from 'src/app/shared/services/popups.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [UserService]
})
export class ForgotPasswordComponent {
  constructor(private user: UserService, private router: Router, private popupsService: PopupsService){ }

  userEmail = new FormControl('', [Validators.required, Validators.email]);

 async onReset(){
  
  //asign if userEmail is null
  const email: string = this.userEmail.value || '';

    await this.user.resetPassword(email)
      .then(response => {
        this.popupsService.openSnackBar(`Se ha enviado un mail a ${email}`, 'x', 3000, 'right', 'top');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.popupsService.openSnackBar(`El usuario ${email} no existe`, 'x', 3000, 'right', 'top');
      })
  }

}
