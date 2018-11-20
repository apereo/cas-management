import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../../data';
import {FormData} from '../../../domain/form-data';
import {RegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => RequiredComponent)
  }]
})
export class RequiredComponent extends HasControls implements OnInit {

  formData: FormData;
  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;
  caseInsensitive: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy;
    this.formData = data.formData;
    this.original = data.original && data.original.accessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('caseInsensitive', this.caseInsensitive);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.caseInsensitive;
    this.caseInsensitive = new MgmtFormControl(this.accessStrategy.caseInsensitive, og);
  }

}
