import {Component, forwardRef, OnInit} from '@angular/core';
import {GrouperRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-grouper',
  templateUrl: './grouper.component.html',
  styleUrls: ['./grouper.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => GrouperComponent)
  }]
})
export class GrouperComponent extends HasControls implements OnInit {

  accessStrategy: GrouperRegisteredServiceAccessStrategy;
  original: GrouperRegisteredServiceAccessStrategy;
  groupField: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy as GrouperRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GrouperRegisteredServiceAccessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('groupField', this.groupField);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.groupField;
    this.groupField = new MgmtFormControl(this.accessStrategy.groupField, og);
  }

}
