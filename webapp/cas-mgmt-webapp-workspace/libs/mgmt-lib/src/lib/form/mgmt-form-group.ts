import {FormGroup} from '@angular/forms';

export interface MgmtFormGroup<T> extends FormGroup {

  mapForm(service: T);

}




