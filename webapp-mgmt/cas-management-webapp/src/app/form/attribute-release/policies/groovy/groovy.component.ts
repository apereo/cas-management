import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../../messages';
import {Data} from '../../../data';
import {
  GroovyScriptAttributeReleasePolicy
} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  policy: GroovyScriptAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as GroovyScriptAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
