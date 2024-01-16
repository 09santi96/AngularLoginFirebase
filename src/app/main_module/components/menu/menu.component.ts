import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { firstValueFrom  } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  @Output() closeSideNav = new EventEmitter<void>();

  public menusAlloweds!: string[];
  items: MenuItem[] = [];

  constructor(private userService: UserService ){
    this.items = [
      {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          routerLink: 'dashboard',
          visible: true,
          command: () => {this.onClickButtonClose()}
      },
      {
        label: 'Accesos',
        icon: 'pi pi-fw pi-plus',
        visible: true,
        items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                routerLink: 'users',
                visible: false,
                command: () => {this.onClickButtonClose()}
            },
            {
                label: 'Perfiles',
                icon: 'pi pi-fw pi-id-card',
                routerLink: 'profiles',
                visible: false,
                command: () => {this.onClickButtonClose()}
            },
            {
                label: 'Veterinarios',
                icon: 'pi pi-fw pi-github',
                routerLink: 'vets',
                visible: false,
                command: () => {this.onClickButtonClose()}
            },
            {
                label: 'Legajos',
                icon: 'pi pi-fw pi-folder-open',
                visible: false,
                command: () => {this.onClickButtonClose()}
            }
        ]

    }
    ];

    this.retrieveDataForCurrentUser()
    .then(rs =>{
      this.menusAlloweds = rs;
    })

  }

  ngOnInit() {
    setTimeout(() => {
      this.menusAlloweds.forEach(labelToSearch => {
        this.canAccessToThisMenu(this.items, labelToSearch);
      }); 
    }, 4000);
  }

  async retrieveDataForCurrentUser(): Promise<any> {
    const rs = await firstValueFrom(this.userService.getCurrentUserData());
    const data = await firstValueFrom(this.userService.getCurrentPerfilData(rs[0].perfil))
    return data[0].access;
  }

  canAccessToThisMenu(items: any[], searchLabel: any): string | null {
      for (const item of items) {
          if (item.label === searchLabel) {
              item.visible = true;
              return item.visible;
          }
          if (item.items) {
              const foundLabel = this.canAccessToThisMenu(item.items, searchLabel);
              if (foundLabel) {
                return foundLabel;
              }
          }
      }
      return null;
  }


  onClickButtonClose() {
    this.closeSideNav.emit();
  }

}