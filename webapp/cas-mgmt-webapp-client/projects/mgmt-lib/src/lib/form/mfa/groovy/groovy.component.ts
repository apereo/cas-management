import { Component, OnInit } from '@angular/core';
import {GroovyRegisteredServiceMultifactorPolicy} from '../../../domain/multifactor';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  policy: GroovyRegisteredServiceMultifactorPolicy;
  original: GroovyRegisteredServiceMultifactorPolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy;
    this.original = data.original && data.original.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy;

  }

  ngOnInit() {
  }

}
