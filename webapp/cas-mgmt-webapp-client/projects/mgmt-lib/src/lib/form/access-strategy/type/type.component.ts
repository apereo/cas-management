import {Component, Input, OnInit} from '@angular/core';
import {AccessStrategyType} from '../../../domain/access-strategy';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input()
  control: FormGroup;

  type: AccessStrategyType;
  TYPE = AccessStrategyType;
  types = [AccessStrategyType.DEFAULT,
    AccessStrategyType.TIME,
    AccessStrategyType.GROUPER,
    AccessStrategyType.REMOTE,
    AccessStrategyType.SURROGATE,
    AccessStrategyType.GROOVY_SURROGATE,
    AccessStrategyType.GROOVY
  ];

  typeControl: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.typeControl = this.control.get('type') as MgmtFormControl;
  }

}
