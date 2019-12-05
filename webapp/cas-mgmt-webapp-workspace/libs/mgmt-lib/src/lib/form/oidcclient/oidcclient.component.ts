import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../form-data.service';
import {OidcClientForm} from './oidcclient.form';

@Component({
  selector: 'lib-oidcclient',
  templateUrl: './oidcclient.component.html'
})
export class OidcclientComponent implements OnInit {

  @Input()
  form: OidcClientForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }
}
