import { Component, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth_module/services/user.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnDestroy  {

  constructor(
    private userService: UserService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('mySidenav') sidenav: any;

  OnToggleMenu(): void {
    if (this.sidenav) {
      if (this.sidenav.opened) {
        this.sidenav.close();
      } else {
        this.sidenav.open(); 
      }
    }
  }

  closeMainMenu() {
    this.sidenav.close();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onLogout(): void {
    Swal.fire({
      title: 'Deseas cerrar sesion?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      background: '#e6d9fd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.userService.logout()
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(error => console.log(error));
      }
    })
  }

  viewPerfil(){
    this.router.navigate(['/main/profile']);
  }
}
