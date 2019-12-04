import {Component, Input, OnInit} from '@angular/core';
import {ScriptUidForm} from './script.form';

@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html'
})
export class ScriptComponent implements OnInit {

  @Input()
  form: ScriptUidForm;

  constructor() {
  }

  ngOnInit() {
  }

}
