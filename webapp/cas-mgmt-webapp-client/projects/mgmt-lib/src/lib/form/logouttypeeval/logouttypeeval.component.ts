import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormDataService} from '../../form-data.service';

@Component({
  selector: 'lib-logouttypeeval',
  templateUrl: './logouttypeeval.component.html'
})
export class LogouttypeevalComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
