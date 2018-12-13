import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SpinnerComponent} from './spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  timer;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  start(msg?: string){
    this.timer = setTimeout(() => {
      this.snackBar.openFromComponent(SpinnerComponent, {
        data: msg || 'Loading',
        verticalPosition: 'top'
      });
    }, 100);
  }

  stop() {
    clearTimeout(this.timer);
    this.snackBar.dismiss();
  }

}
