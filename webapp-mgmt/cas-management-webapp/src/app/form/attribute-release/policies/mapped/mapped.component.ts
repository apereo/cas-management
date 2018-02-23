import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../../messages';
import {Data} from '../../../data';
import {ReturnMappedAttributeReleasePolicy} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-mapped',
  templateUrl: './mapped.component.html',
  styleUrls: ['./mapped.component.css']
})
export class MappedComponent implements OnInit {

  policy: ReturnMappedAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as ReturnMappedAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
