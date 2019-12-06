import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SpinnerComponent} from './spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  timer;
  snack;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  start(msg?: string) {
    this.timer = setTimeout(() => {
      this.snack = this.snackBar.openFromComponent(SpinnerComponent, {
        data: msg || 'Loading',
        verticalPosition: 'top',
        duration: 30000
      });
    }, 100);
  }

  stop() {
    clearTimeout(this.timer);
    if (this.snack) {
      this.snack.dismiss();
    }
  }

}
