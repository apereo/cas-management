import { Component, OnInit } from '@angular/core';
import {DefaultRegisteredServiceMultifactorPolicy} from '../../../domain/multifactor';
import {FormData} from '../../../domain/form-data';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  policy: DefaultRegisteredServiceMultifactorPolicy;
  original: DefaultRegisteredServiceMultifactorPolicy;
  formData: FormData;

  constructor(public data: DataRecord) {
    this.policy = data.service.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy;
    this.original = data.original && data.original.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
  }

}
