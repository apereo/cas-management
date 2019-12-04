import {Component, Input, OnInit} from '@angular/core';
import {PrincipalUidForm} from './principal.form';

@Component({
  selector: 'lib-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit {

  @Input()
  form: PrincipalUidForm;

  @Input()
  attributes: string[];

  constructor() {
  }

  ngOnInit() {
  }

}
