import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormDataService} from '../../../../form-data.service';

@Component({
  selector: 'lib-allowed',
  templateUrl: './allowed.component.html',
  styleUrls: ['./allowed.component.css']
})
export class AllowedComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
