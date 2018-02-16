import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {FormData} from '../../../../domain/form-data';
import {GroovyRegisteredServiceAccessStrategy} from '../../../../domain/access-strategy';

@Component({
  selector: 'app-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  formData: FormData;
  accessStrategy: GroovyRegisteredServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.formData = data.formData;
    this.accessStrategy = data.service.accessStrategy as GroovyRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
