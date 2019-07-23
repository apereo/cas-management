import {FormGroup} from '@angular/forms';

export interface MgmtFormGroup<T> extends FormGroup {

  formMap(): any;

  mapForm(service: T);

}




