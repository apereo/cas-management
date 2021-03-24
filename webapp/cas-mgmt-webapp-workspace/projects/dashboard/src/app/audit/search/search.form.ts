import {FormControl, FormGroup} from '@angular/forms';

/**
 * Form group for displaying and updating search options for audit records.
 *
 * @author Travis Schmidt
 */
export class SearchForm extends FormGroup {

  get interval() { return this.get('interval') as FormControl; }
  get startDate() { return this.get('startDate') as FormControl; }
  get startHour() { return this.get('startHour') as FormControl; }
  get startMinute() { return this.get('startMinute') as FormControl; }
  get startSecond() { return this.get('startSecond') as FormControl; }
  get startMilli() { return this.get('startMilli') as FormControl; }
  get endDate() { return this.get('endDate') as FormControl; }
  get endHour() { return this.get('endHour') as FormControl; }
  get endMinute() { return this.get('endMinute') as FormControl; }
  get endSecond() { return this.get('endSecond') as FormControl; }
  get endMilli() { return this.get('endMilli') as FormControl; }
  get principal() { return this.get('principal') as FormControl; }
  get action() { return this.get('action') as FormControl; }
  get clientIP() { return this.get('clientIP') as FormControl; }
  get resource() { return this.get('resource') as FormControl; }

  constructor() {
    super({
      interval: new FormControl(''),
      startDate: new FormControl(0),
      startHour: new FormControl(0),
      startMinute: new FormControl(0),
      startSecond: new FormControl(0),
      startMilli: new FormControl(0),
      endDate: new FormControl(0),
      endHour: new FormControl(0),
      endMinute: new FormControl(0),
      endSecond: new FormControl(0),
      endMilli: new FormControl(0),
      principal: new FormControl(''),
      action: new FormControl(''),
      clientIP: new FormControl(''),
      resource: new FormControl('')
    });
  }
}
