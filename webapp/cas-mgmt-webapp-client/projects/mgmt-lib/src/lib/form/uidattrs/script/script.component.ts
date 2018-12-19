import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})
export class ScriptComponent implements OnInit {

  @Input()
  control: FormGroup;

  script: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.script = this.control.get('script') as MgmtFormControl;
  }

}
