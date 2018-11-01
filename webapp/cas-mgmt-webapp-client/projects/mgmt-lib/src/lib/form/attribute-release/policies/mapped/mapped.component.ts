import { Component, OnInit } from '@angular/core';
import {ReturnMappedAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';

@Component({
  selector: 'lib-mapped',
  templateUrl: './mapped.component.html',
  styleUrls: ['./mapped.component.css']
})
export class MappedComponent implements OnInit {

  policy: ReturnMappedAttributeReleasePolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as ReturnMappedAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
