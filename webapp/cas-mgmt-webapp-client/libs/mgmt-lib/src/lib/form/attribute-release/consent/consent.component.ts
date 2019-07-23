import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-attribute-release-consent',
  templateUrl: './consent.component.html'
})
export class ConsentComponent implements OnInit {

  @Input()
  control: FormGroup;
  consentEnabled: MgmtFormControl;
  excluded: MgmtFormControl;
  includeOnly: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.consentEnabled = this.control.get('enabled') as MgmtFormControl;
    this.excluded = this.control.get('excludedAttributes') as MgmtFormControl;
    this.includeOnly = this.control.get('includeOnlyAttributes') as MgmtFormControl;
  }

  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
