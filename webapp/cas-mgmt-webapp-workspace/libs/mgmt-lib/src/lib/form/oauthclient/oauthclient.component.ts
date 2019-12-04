import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormDataService} from '../../form-data.service';
import {OauthClientForm} from './oauthclient.form';

@Component({
  selector: 'lib-oauthclient',
  templateUrl: './oauthclient.component.html'
})
export class OauthclientComponent implements OnInit {

  @Input()
  form: OauthClientForm;
  showOAuthSecret: boolean;

  @Output()
  generateId: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  generateSecret: EventEmitter<void> = new EventEmitter<void>();

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
