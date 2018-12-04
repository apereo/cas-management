import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  @Input()
  control: FormGroup;
  entityAttribute: MgmtFormControl;
  entityAttributeFormat: MgmtFormControl;
  entityAttributeValues: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.entityAttribute = this.control.get('entityAttribute') as MgmtFormControl;
    this.entityAttributeFormat = this.control.get('entityAttributeFormat') as MgmtFormControl;
    this.entityAttributeValues = this.control.get('entityAttributeValues') as MgmtFormControl;
  }

}
