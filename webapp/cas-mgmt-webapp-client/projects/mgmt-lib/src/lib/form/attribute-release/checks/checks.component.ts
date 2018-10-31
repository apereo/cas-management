import {Component, OnInit} from '@angular/core';
import {RegisteredServiceAttributeReleasePolicy} from '../../../domain/attribute-release';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-attribute-release-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  policy: RegisteredServiceAttributeReleasePolicy;
  original: RegisteredServiceAttributeReleasePolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy;
    this.original = data.original && data.service.attributeReleasePolicy;
  }

  ngOnInit() {
  }

}
