import { Injectable } from '@angular/core';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition
}from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class PopupsService {

  constructor(private snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string, duration: number, horizontal: MatSnackBarHorizontalPosition , vertical:MatSnackBarVerticalPosition ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontal,
      verticalPosition: vertical
    });
  }

}
