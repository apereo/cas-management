import { Component, OnInit } from '@angular/core';
import {AnonymousRegisteredServiceUsernameProvider} from '../../../domain/attribute-provider';
import {FormData} from '../../../domain/form-data';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements OnInit {

  provider: AnonymousRegisteredServiceUsernameProvider;
  original: AnonymousRegisteredServiceUsernameProvider;
  formData: FormData;

  constructor(public data: DataRecord) {
    this.provider = data.service.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
    this.formData = data.formData;
    this.original = data.original && data.original.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
  }

  ngOnInit() {
  }

}
