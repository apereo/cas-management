/**
 * Created by tschmidt on 2/22/17.
 */

import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../domain/registered-service';
import {MgmtFormGroup} from './mgmt-form-group';

@Injectable({
  providedIn: 'root'
})
export class DataRecord {
  service: AbstractRegisteredService;
  original: AbstractRegisteredService | undefined;
  invalidRegEx = false;
  invalidDomain = false;
  formMap: Map<String, MgmtFormGroup<AbstractRegisteredService>>;

  constructor(){

  }
}


