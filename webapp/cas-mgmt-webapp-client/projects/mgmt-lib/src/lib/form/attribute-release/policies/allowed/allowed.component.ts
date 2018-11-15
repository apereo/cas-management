import { Component, OnInit } from '@angular/core';
import {FormData} from '../../../../domain/form-data';
import {ReturnAllowedAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-allowed',
  templateUrl: './allowed.component.html',
  styleUrls: ['./allowed.component.css']
})
export class AllowedComponent implements OnInit {

  policy: ReturnAllowedAttributeReleasePolicy;
  original: ReturnAllowedAttributeReleasePolicy;
  formData: FormData;
  allowedAttribtues: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as ReturnAllowedAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ReturnAllowedAttributeReleasePolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
    this.allowedAttribtues = new MgmtFormControl(this.policy.allowedAttributes, this.original.allowedAttributes);
  }

}
