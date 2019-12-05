import {Component, Input, OnInit} from '@angular/core';
import {ScriptReleaseForm} from './script.form';

@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html'
})
export class ScriptComponent implements OnInit {

  @Input()
  form: ScriptReleaseForm;

  constructor() {
  }

  ngOnInit() {
  }


}
