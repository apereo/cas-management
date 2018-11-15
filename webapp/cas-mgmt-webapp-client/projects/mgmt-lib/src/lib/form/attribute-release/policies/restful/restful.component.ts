import { Component, OnInit } from '@angular/core';
import {ReturnRestfulAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-restful',
  templateUrl: './restful.component.html',
  styleUrls: ['./restful.component.css']
})
export class RestfulComponent implements OnInit {

  policy: ReturnRestfulAttributeReleasePolicy;
  original: ReturnRestfulAttributeReleasePolicy;
  endpoint: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as ReturnRestfulAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ReturnRestfulAttributeReleasePolicy;
  }

  ngOnInit() {
    this.endpoint = new MgmtFormControl(this.policy.endpoint, this.original.endpoint);
  }

}
