import {FormControl} from '@angular/forms';

export class MgmtFormControl extends FormControl {

  previous: any;
  current: any;

  constructor(value, previous?, syncValidators?, asyncValidators?) {
    super(value, syncValidators, asyncValidators);

  }

  showPrevious() {
    this.current = this.value;
    this.setValue(this.previous, {emitEvent: false});
  }

  showCurrent() {
    this.setValue(this.current, {emitEvent: false});
  }

  difference(): boolean {
    return this.previous !== this.current;
  }

}
