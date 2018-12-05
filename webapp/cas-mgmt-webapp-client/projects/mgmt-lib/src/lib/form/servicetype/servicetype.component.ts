import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormDataService} from '../../form-data.service';

@Component({
  selector: 'lib-servicetype',
  templateUrl: './servicetype.component.html'
})
export class ServicetypeComponent implements OnInit {


  @Input()
  control: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {

  }

}
