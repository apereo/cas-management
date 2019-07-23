import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent implements OnInit {

  @Input()
  control: FormGroup;

  endpointUrl: MgmtFormControl;
  responseCodes: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.endpointUrl = this.control.get('endpointUrl') as MgmtFormControl;
    this.responseCodes = this.control.get('responseCodes') as MgmtFormControl;
  }

}
