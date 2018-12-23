import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormDataService} from '../../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-allowed',
  templateUrl: './allowed.component.html'
})
export class AllowedComponent implements OnInit {

  @Input()
  control: FormGroup;

  allowed: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.allowed = this.control.get('allowed') as MgmtFormControl;
  }

}
