import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {PrincipalAttributeRegisteredServiceUsernameProvider} from '../../../../domain/attribute-provider';
import {FormData} from '../../../../domain/form-data';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  provider: PrincipalAttributeRegisteredServiceUsernameProvider;
  original: PrincipalAttributeRegisteredServiceUsernameProvider;
  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.provider = data.service.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.original = data.original &&
                    data.original.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.formData = data.formData;
  }

  ngOnInit() {
  }

}
