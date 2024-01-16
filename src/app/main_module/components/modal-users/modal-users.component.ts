import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/* FORMS */
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { PopupsService } from 'src/app/shared/services/popups.service';
import { Subscription, timestamp } from 'rxjs';
import { ErrorsService } from '../../services/errors.service';


interface Perfiles {
  value: number;
  viewValue: string;
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.css']
})
export class ModalUsersComponent {
  hide = true;
  formUsers!: FormGroup;
  matcher = new MyErrorStateMatcher();
  isSavingNewUser = false;
  newUser: any;
  dateCreationUserNotChange: any;
  private usersModalSubscription!: Subscription;

  perfiles: Perfiles[] = [
    { value: 0, viewValue: 'Administrador' },
    { value: 1, viewValue: 'secretaría' },
    { value: 2, viewValue: 'Veterinario' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private refDialog: MatDialogRef<ModalUsersComponent>,
    private userService: UserService,
    private popupsService: PopupsService,
    private errorsService :ErrorsService
  ) 
  {
    //CREATE FORM GROUP
    this.formUsers = new FormGroup({
      cuil: new FormControl('', [Validators.required]),
      names: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      perfil: new FormControl('', [Validators.required])
    });
    if (this.data.title == 'Nuevo usuario') {

    } else if (this.data.title == 'Editar usuario') {
      this.retrieveDataForEditUser(this.data.uid);
      //disable  mail and password, porque no afecta la autenticacion
      this.formUsers.get('email')?.disable();
      this.formUsers.get('password')?.disable();
    }
  }

  OnCreateUser(): void {
    this.isSavingNewUser = true;
   
    if (this.data.title === 'Nuevo usuario') {
      //registra usuario y guarda usuario nuevo
      this.onRegisterUser();
      
    } else if (this.data.title === 'Editar usuario') {
      //guarda edicion de usuario
      // que no se cambia el dateCreationUser solo el dateUpdateUser
      this.newUser = {
        cuil: this.formUsers.value.cuil,
        names: this.formUsers.value.names,
        email: this.formUsers.getRawValue().email,
        password: this.formUsers.getRawValue().password,
        perfil: this.formUsers.value.perfil,
        dateCreationUser: this.dateCreationUserNotChange,
        dateUpdateUser: new Date(),
        uid: this.data.uid
      }
      this.onAddUser();
    }

  }

  retrieveDataForEditUser(id: string): void {
    this.usersModalSubscription = this.userService.getUserById(id).subscribe({
      next: (rs) => {
        // no actualiza los errores de Validators
        this.formUsers.get('cuil')?.setValue(rs[0].cuil);
        this.formUsers.get('names')?.setValue(rs[0].names);
        this.formUsers.get('email')?.setValue(rs[0].email);
        this.formUsers.get('password')?.setValue(rs[0].password);
        this.formUsers.get('perfil')?.setValue(rs[0].perfil);
        this.dateCreationUserNotChange = rs[0].dateCreationUser;
      }
    })
     
  }

  onRegisterUser(): void {
    this.userService.register(this.formUsers.value.email, this.formUsers.value.password)
      .then(userCredential => {
        //if register true
        this.newUser = {
          cuil: this.formUsers.value.cuil,
          names: this.formUsers.value.names,
          email: this.formUsers.value.email,
          password: this.formUsers.value.password,
          perfil: this.formUsers.value.perfil,
          dateCreationUser: new Date(),
          dateUpdateUser: new Date(),
          uid: userCredential.user.uid
        }
        this.popupsService.openSnackBar('¡Usuario registrado exitosamente!', 'x', 4000, 'center', 'top');
        this.onAddUser();
      })
      .catch((error) => {
        this.refDialog.close();
        this.popupsService.openSnackBar('error al registrar el usuario: ' + error, 'x', 3000, 'right', 'top');
        this.errorsService.addError({descripcionError: error, tipo: 'error al registrar el usuario', dateCreationError: new Date()});
      })
  }


  onAddUser(): void {
    //guarda el usuario en la collecion users (si es nuevo crea un documento)
    this.userService.addUsers(this.newUser)
      .then((response) => {
        if (response === 'Exito') {
          // Mostrar una alerta si la operación fue un éxito.
          this.popupsService.openSnackBar('¡Usuario guardado exitosamente!', 'x', 4000, 'right', 'top');

        } else {
          // Mostrar una alerta si ocurrió un error.
          this.popupsService.openSnackBar('error: ' + response, 'x', 3000, 'right', 'top');
          this.errorsService.addError({descripcionError: response, tipo: 'error al agregar/editar el usuario', dateCreationError: new Date()});

        }
        this.isSavingNewUser = false;
        this.refDialog.close();
      })
      .catch((error) => {
        // Mostrar una alerta si ocurrió un error inesperado en la promesa.
        this.isSavingNewUser = false;
        this.errorsService.addError({descripcionError: error, tipo: 'error al agregar/editar el usuario', dateCreationError: new Date()});
        this.refDialog.close();
      });
  }

  closeModal(): void {
    this.unsubscribeFromModalUser();
    this.refDialog.close();
  }

  unsubscribeFromModalUser(): void {
    if (this.usersModalSubscription) {
      this.usersModalSubscription.unsubscribe();
    }
  }

}
