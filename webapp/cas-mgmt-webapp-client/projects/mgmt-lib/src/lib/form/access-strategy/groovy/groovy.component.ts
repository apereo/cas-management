import { Component, OnInit } from '@angular/core';
import {DataRecord} from '../../data';
import {FormData} from '../../../domain/form-data';
import {GroovyRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  formData: FormData;
  accessStrategy: GroovyRegisteredServiceAccessStrategy;
  original: GroovyRegisteredServiceAccessStrategy;

  constructor(public data: DataRecord) {
    this.formData = data.formData;
    this.accessStrategy = data.service.accessStrategy as GroovyRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GroovyRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
