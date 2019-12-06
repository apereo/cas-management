import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {IdTokenForm} from './idtoken.form';

@Component({
  selector: 'lib-idtoken',
  templateUrl: './idtoken.component.html',
  styleUrls: ['./idtoken.component.css']
})
export class IdtokenComponent implements OnInit {

  @Input()
  form: IdTokenForm;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
  }

}
