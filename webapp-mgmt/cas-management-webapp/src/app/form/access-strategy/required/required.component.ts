import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {FormData} from '../../../../domain/form-data';
import {RegisteredServiceAccessStrategy} from '../../../../domain/access-strategy';

@Component({
  selector: 'app-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css']
})
export class RequiredComponent implements OnInit {

  formData: FormData;
  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.accessStrategy = data.service.accessStrategy;
    this.formData = data.formData;
    this.original = data.original && data.original.accessStrategy;
  }

  ngOnInit() {
  }

}
