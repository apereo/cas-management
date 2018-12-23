import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-anonymous',
  templateUrl: './anonymous.component.html'
})
export class AnonymousComponent implements OnInit {

  @Input()
  control: FormGroup;
  salt: MgmtFormControl;
  attribute: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.salt = this.control.get('salt') as MgmtFormControl;
    this.attribute = this.control.get('attribute') as MgmtFormControl;
  }

}
