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
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.snack = this.snackBar.openFromComponent(SpinnerComponent, {
        data: msg || 'Working...',
        verticalPosition: 'top',
        duration: 30000
      });
    }, 200);
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.snack) {
      this.snack.dismiss();
    }
  }

}
