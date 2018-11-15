import { Component, OnInit } from '@angular/core';
import {MetadataEntityAttributesAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  policy: MetadataEntityAttributesAttributeReleasePolicy;
  original: MetadataEntityAttributesAttributeReleasePolicy;
  entityAttribute: MgmtFormControl;
  entityAttributeFormat: MgmtFormControl;
  entityAttributeValues: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as MetadataEntityAttributesAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as MetadataEntityAttributesAttributeReleasePolicy;
  }

  ngOnInit() {
    this.entityAttribute = new MgmtFormControl(this.policy.entityAttribute, this.original.entityAttribute);
    this.entityAttributeFormat = new MgmtFormControl(this.policy.entityAttributeFormat, this.original.entityAttributeFormat);
    this.entityAttributeValues = new MgmtFormControl(this.policy.entityAttributeValues, this.original.entityAttributeValues);
  }

}
