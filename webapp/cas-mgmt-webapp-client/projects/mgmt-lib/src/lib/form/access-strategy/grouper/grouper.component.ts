import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-grouper',
  templateUrl: './grouper.component.html'
})
export class GrouperComponent implements OnInit {

  @Input()
  control: FormGroup;
  groupField: MgmtFormControl;
  fields: String[];

  constructor(public formData: FormDataService) {
    this.fields = formData.options.grouperFields;
  }

  ngOnInit() {
    this.groupField = this.control.get('groupField') as MgmtFormControl;
  }

}
