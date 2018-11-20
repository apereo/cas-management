import {Component, forwardRef, OnInit} from '@angular/core';
import {FormData} from '../../../../domain/form-data';
import {ReturnAllowedAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {HasControls} from '../../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-allowed',
  templateUrl: './allowed.component.html',
  styleUrls: ['./allowed.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => AllowedComponent)
  }]
})
export class AllowedComponent extends HasControls implements OnInit {

  policy: ReturnAllowedAttributeReleasePolicy;
  original: ReturnAllowedAttributeReleasePolicy;
  formData: FormData;
  allowedAttributes: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy as ReturnAllowedAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ReturnAllowedAttributeReleasePolicy;
    this.formData = data.formData;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('allowedAttributes', this.allowedAttributes);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.allowedAttributes;
    this.allowedAttributes = new MgmtFormControl(this.policy.allowedAttributes, og);
  }

}
