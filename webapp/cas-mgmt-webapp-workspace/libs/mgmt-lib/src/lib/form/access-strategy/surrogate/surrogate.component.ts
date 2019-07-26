import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-surrogate',
  templateUrl: './surrogate.component.html'
})
export class SurrogateComponent implements OnInit {

  @Input()
  control: FormGroup;

  surrogateEnabled: MgmtFormControl;
  surrogateRequiredAttributes: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.surrogateEnabled = this.control.get('surrogateEnabled') as MgmtFormControl;
    this.surrogateRequiredAttributes = this.control.get('attributes') as MgmtFormControl;
  }
}

