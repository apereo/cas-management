import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css']
})
export class RequiredComponent implements OnInit {

  @Input()
  control: FormGroup;
  caseInsensitive: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.caseInsensitive = this.control.get('caseInsensitive') as MgmtFormControl;

  }

}
