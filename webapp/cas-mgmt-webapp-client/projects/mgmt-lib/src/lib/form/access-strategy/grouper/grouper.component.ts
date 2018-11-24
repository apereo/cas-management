import {Component, forwardRef, Input, OnInit} from '@angular/core';
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

  @Input()
  data: GrouperRegisteredServiceAccessStrategy[];

  groupField: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('groupField', this.groupField);
    return c;
  }

  ngOnInit() {
    const og = this.data[1] && this.data[1].groupField;
    this.groupField = new MgmtFormControl(this.data[0].groupField, og);
  }

}
