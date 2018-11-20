/**
 * Created by tschmidt on 2/22/17.
 */

import {EventEmitter, Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../domain/registered-service';
import {FormData} from '../domain/form-data';

@Injectable({
  providedIn: 'root'
})
export class DataRecord {
  service: AbstractRegisteredService;
  original: AbstractRegisteredService | undefined;
  formData: FormData = new FormData();
  submitted: boolean;
  view: boolean;
  save: EventEmitter<void> = new EventEmitter<void>();
  invalidRegEx = false;
  invalidDomain = false;

  constructor(){

  }
}


