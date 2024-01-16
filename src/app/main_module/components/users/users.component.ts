import {AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Subject, Subscription } from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { UserService } from '../../services/user.service';
import { ModalUsersComponent } from '../modal-users/modal-users.component';



export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Primera pagina`;
  itemsPerPageLabel = `Usuarios por pagina:`;
  lastPageLabel = `Ultima pagina`;
  nextPageLabel = 'Siguiente pagina';
  previousPageLabel = 'Anterior pagina';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Pagina 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}]
})
export class UsersComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = [ 'dateUpdateUser', 'cuil', 'names', 'email', 'perfil', 'actions'];
  dataSource!: MatTableDataSource<any>; 
  isLoadingResults = false;

  dataDialogToSend = {
    title: 'Nuevo usuario',
    uid: ''
  }

  private usersSubscription!: Subscription;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog, 
    private usersService: UserService, 
    private elementRef: ElementRef
    ){
    }
  
  ngOnInit(){
    this.isLoadingResults = true;
  }

  ngAfterViewInit() {
    this.usersSubscription = this.usersService.getUsers().subscribe(rs => {
      this.dataSource = new MatTableDataSource(rs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    });

    const elementToHide = this.elementRef.nativeElement.querySelector('.mat-mdc-form-field-subscript-wrapper');
    // Verificar si el elemento existe antes de ocultarlo
    if (elementToHide) {
      //elementToHide.style.content = 'none';
      const nuevoSpan = document.createElement("strong");
      nuevoSpan.textContent = "Ultima modificacion";
      elementToHide.appendChild(nuevoSpan);
    }

  }

  ngOnDestroy() {
    // Unsubscribe from the Observable to avoid memory leaks
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(id:string) :void {
    this.dataDialogToSend['uid'] = id;
    if(id !== '0'){
      this.dataDialogToSend['title'] = 'Editar usuario';
    }else{
      this.dataDialogToSend['title'] = 'Nuevo usuario';
    }

    //open dialog nuevo usuario
    this.dialog.open(ModalUsersComponent, {
      disableClose: true,
      width: '50%',
      height: 'auto',
      data: this.dataDialogToSend
    })

  }



}
