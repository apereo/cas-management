import {FormControl, FormGroup} from '@angular/forms';

/**
 * Form for release dialog.
 *
 * @author Travis Schmidt
 */
export class DialogForm extends FormGroup {

  get username() { return this.get('username') as FormControl; }

  constructor() {
    super({
      username: new FormControl(),
    });
  }
}
