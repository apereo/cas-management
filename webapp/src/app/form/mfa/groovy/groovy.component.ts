import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {GroovyRegisteredServiceMultifactorPolicy} from '../../../../domain/multifactor';
import {Data} from '../../data';

@Component({
  selector: 'app-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  policy: GroovyRegisteredServiceMultifactorPolicy;
  original: GroovyRegisteredServiceMultifactorPolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy;
    this.original = data.original && data.original.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy;

  }

  ngOnInit() {
  }

}
