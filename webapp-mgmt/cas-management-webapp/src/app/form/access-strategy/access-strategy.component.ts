import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Messages} from '../../messages';
import {
    DefaultRegisteredServiceAccessStrategy, GroovyRegisteredServiceAccessStrategy,
    GrouperRegisteredServiceAccessStrategy,
    RemoteEndpointServiceAccessStrategy, SurrogateRegisteredServiceAccessStrategy,
    TimeBasedRegisteredServiceAccessStrategy
} from '../../../domain/access-strategy';
import {FormData} from '../../../domain/form-data';
import {Util} from '../../util/util';
import {Data} from '../data';
import {DefaultRegisteredServiceDelegatedAuthenticationPolicy} from '../../../domain/delegated-authn';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
    MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent
} from '@angular/material';


enum Type {
  DEFAULT, TIME, GROUPER, REMOTE, SURROGATE, GROOVY
}

@Component({
  selector: 'app-access-strategy',
  templateUrl: './access-strategy.component.html',
})

export class AccessStrategyComponent implements OnInit {
  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.formData = data.formData;
  }

  ngOnInit() {
    const service = this.data.service;

    if (Util.isEmpty(service.accessStrategy.rejectedAttributes)) {
      service.accessStrategy.rejectedAttributes = new Map();
    }

    if (Util.isEmpty(service.accessStrategy.requiredAttributes)) {
      service.accessStrategy.requiredAttributes = new Map();
    }

    if (Util.isEmpty(service.accessStrategy.requiredAttributes)) {
      service.accessStrategy.requiredAttributes = new Map();
    }
  }
}
