import {Component, Input, OnInit} from '@angular/core';
import {ReleasePolicyType} from '../../../domain/attribute-release';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-attribute-release-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  type: ReleasePolicyType;
  TYPE = ReleasePolicyType;
  types = [
    ReleasePolicyType.SCRIPT,
    ReleasePolicyType.GROOVY,
    ReleasePolicyType.RETURN_ALL,
    ReleasePolicyType.DENY_ALL,
    ReleasePolicyType.RETURN_ALLOWED,
    ReleasePolicyType.RETURN_MAPPED,
    ReleasePolicyType.RESTFUL
  ];
  display = ['Script Engine', 'Groovy Script', 'Return All', 'Deny All', 'Return Allowed', 'Return Mapped', 'Return Restful'];

  @Input()
  isSaml: boolean;

  @Input()
  control: FormGroup;

  allowed: MgmtFormControl;
  groovy: MgmtFormControl;
  groovySaml: MgmtFormControl;
  mapped: MgmtFormControl;
  metadata: MgmtFormControl;
  restful: MgmtFormControl;
  script: MgmtFormControl;
  typeControl: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.allowed = this.control.get('allowed') as MgmtFormControl;
    this.groovy = this.control.get('groovy') as MgmtFormControl;
    this.groovySaml = this.control.get('groovySaml') as MgmtFormControl;
    this.mapped = this.control.get('mapped') as MgmtFormControl;
    this.metadata = this.control.get('metadata') as MgmtFormControl;
    this.restful = this.control.get('restful') as MgmtFormControl;
    this.script = this.control.get('script') as MgmtFormControl;
    this.typeControl = this.control.get('type') as MgmtFormControl;
  }

  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }

}
