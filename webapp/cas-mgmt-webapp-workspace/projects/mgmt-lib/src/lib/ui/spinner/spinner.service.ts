import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SpinnerComponent} from './spinner.component';

/**
 * Service used to start and stop a spinner displaying.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  timer;
  snack;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  /**
   * Starts the spinner with the passed message.  Spinner is set to close after 30 seconds.
   *
   * @param msg - message to display
   */
  start(msg?: string) {
    this.timer = setTimeout(() => {
      this.snack = this.snackBar.openFromComponent(SpinnerComponent, {
        data: msg || 'Loading',
        verticalPosition: 'top',
        duration: 30000
      });
    }, 100);
  }

  /**
   * Stops the the current spinner.
   */
  stop() {
    clearTimeout(this.timer);
    if (this.snack) {
      this.snack.dismiss();
    }
  }

}
