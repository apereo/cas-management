import {Component, forwardRef, OnInit} from '@angular/core';
import {MetadataEntityAttributesAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {HasControls} from '../../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => MetadataComponent)
  }]
})
export class MetadataComponent extends HasControls implements OnInit {

  policy: MetadataEntityAttributesAttributeReleasePolicy;
  original: MetadataEntityAttributesAttributeReleasePolicy;
  entityAttribute: MgmtFormControl;
  entityAttributeFormat: MgmtFormControl;
  entityAttributeValues: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy as MetadataEntityAttributesAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as MetadataEntityAttributesAttributeReleasePolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('entityAttribute', this.entityAttribute);
    c.set('entityAttributeFormat', this.entityAttributeFormat);
    c.set('entityAttributeValues', this.entityAttributeValues);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.entityAttribute = new MgmtFormControl(this.policy.entityAttribute, og.entityAttribute);
    this.entityAttributeFormat = new MgmtFormControl(this.policy.entityAttributeFormat, og.entityAttributeFormat);
    this.entityAttributeValues = new MgmtFormControl(this.policy.entityAttributeValues, og.entityAttributeValues);
  }

}
