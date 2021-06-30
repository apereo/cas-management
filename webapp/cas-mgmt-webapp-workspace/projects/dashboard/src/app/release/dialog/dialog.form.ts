import {FormControl, FormGroup} from '@angular/forms';

/**
 * Form for release dialog.
 *
 * @author Travis Schmidt
 */
export class DialogForm extends FormGroup {

  get username() { return this.get('username') as FormControl; }
  get password() { return this.get('password') as FormControl; }
  get service() { return this.get('service') as FormControl; }

  constructor() {
    super({
      username: new FormControl(),
      password: new FormControl(),
      service: new FormControl()
    });
  }
}
