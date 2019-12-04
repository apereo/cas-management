import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {JwksForm} from './jwks.form';

@Component({
  selector: 'lib-jwks',
  templateUrl: './jwks.component.html',
  styleUrls: ['./jwks.component.css']
})
export class JwksComponent implements OnInit {

  @Input()
  form: JwksForm;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
  }

}
