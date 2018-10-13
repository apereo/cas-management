import {Component, OnInit} from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {RegisteredServiceAttributeReleasePolicy} from '../../../../domain/attribute-release';

@Component({
  selector: 'app-attribute-release-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  policy: RegisteredServiceAttributeReleasePolicy;
  original: RegisteredServiceAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy;
    this.original = data.original && data.service.attributeReleasePolicy;
  }

  ngOnInit() {
  }

}
