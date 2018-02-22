import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {AnonymousRegisteredServiceUsernameProvider} from '../../../../domain/attribute-provider';
import {FormData} from '../../../../domain/form-data';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements OnInit {

  provider: AnonymousRegisteredServiceUsernameProvider;
  orig: AnonymousRegisteredServiceUsernameProvider;
  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.provider = data.service.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
    this.formData = data.formData;
    this.orig = data.diff && data.diff.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
  }

  ngOnInit() {
  }

}
