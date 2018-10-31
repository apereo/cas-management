import { Component, OnInit } from '@angular/core';
import {PrincipalAttributeRegisteredServiceUsernameProvider} from '../../../domain/attribute-provider';
import {FormData} from '../../../domain/form-data';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  provider: PrincipalAttributeRegisteredServiceUsernameProvider;
  original: PrincipalAttributeRegisteredServiceUsernameProvider;
  formData: FormData;

  constructor(public data: DataRecord) {
    this.provider = data.service.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.original = data.original &&
                    data.original.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.formData = data.formData;
  }

  ngOnInit() {
  }

}
