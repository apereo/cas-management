import { Component, OnInit } from '@angular/core';
import {RegisteredServiceAccessStrategy} from '../../domain/access-strategy';
import {FormData} from '../../domain/form-data';
import {Util} from '../../util';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-access-strategy',
  templateUrl: './access-strategy.component.html',
  styleUrls: ['./access-strategy.component.css']
})
export class AccessStrategyComponent implements OnInit {

  formData: FormData;

  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy;
    this.formData = data.formData;
    this.original = data.original && data.original.accessStrategy;
  }

  ngOnInit() {
    if (Util.isEmpty(this.accessStrategy.rejectedAttributes)) {
      this.accessStrategy.rejectedAttributes = new Map();
    }

    if (Util.isEmpty(this.accessStrategy.requiredAttributes)) {
      this.accessStrategy.requiredAttributes = new Map();
    }

    if (Util.isEmpty(this.accessStrategy.requiredAttributes)) {
      this.accessStrategy.requiredAttributes = new Map();
    }
  }

}
