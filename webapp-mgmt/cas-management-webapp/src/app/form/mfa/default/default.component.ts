import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {DefaultRegisteredServiceMultifactorPolicy} from '../../../../domain/multifactor';
import {FormData} from '../../../../domain/form-data';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  policy: DefaultRegisteredServiceMultifactorPolicy;
  original: DefaultRegisteredServiceMultifactorPolicy;
  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy;
    this.original = data.original && data.original.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
  }

}
