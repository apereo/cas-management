import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import { RegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {FormData} from '../../../domain/form-data';
import {Util} from '../../util/util';
import {Data} from '../data';

@Component({
  selector: 'app-access-strategy',
  templateUrl: './access-strategy.component.html',
})

export class AccessStrategyComponent implements OnInit {
  formData: FormData;

  accessStrategy: RegisteredServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.accessStrategy = data.service.accessStrategy;
    this.formData = data.formData;
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
