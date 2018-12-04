import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormDataService} from '../../../../form-data.service';

@Component({
  selector: 'lib-mapped',
  templateUrl: './mapped.component.html',
  styleUrls: ['./mapped.component.css']
})
export class MappedComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
