import {Component, forwardRef, OnInit} from '@angular/core';
import {ReturnRestfulAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {HasControls} from '../../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-restful',
  templateUrl: './restful.component.html',
  styleUrls: ['./restful.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => RestfulComponent)
  }]
})
export class RestfulComponent extends HasControls implements OnInit {

  policy: ReturnRestfulAttributeReleasePolicy;
  original: ReturnRestfulAttributeReleasePolicy;
  endpoint: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy as ReturnRestfulAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ReturnRestfulAttributeReleasePolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('endpoint', this.endpoint);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.endpoint;
    this.endpoint = new MgmtFormControl(this.policy.endpoint, og);
  }

}
