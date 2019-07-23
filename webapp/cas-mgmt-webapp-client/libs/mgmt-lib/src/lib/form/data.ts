/**
 * Created by tschmidt on 2/22/17.
 */

import {EventEmitter, Injectable} from '@angular/core';
import {AbstractRegisteredService} from 'domain-lib';
import {MgmtFormGroup} from './mgmt-form-group';

@Injectable({
  providedIn: 'root'
})
export class DataRecord {
  service: AbstractRegisteredService;
  original: AbstractRegisteredService | undefined;
  formMap: Map<string, MgmtFormGroup<AbstractRegisteredService>>;
  typeChange = new EventEmitter<void>();

  constructor() {
  }
}


