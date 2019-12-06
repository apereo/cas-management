import {Component, Input, OnInit} from '@angular/core';
import {BaseDateTimeSsoForm, SsoPolicyForm} from './sso-policy.form';
import {SsoPolicyType} from 'domain-lib';

@Component({
  selector: 'lib-sso-policy',
  templateUrl: './sso-policy.component.html',
  styleUrls: ['./sso-policy.component.css']
})
export class SsoPolicyComponent implements OnInit {

  @Input()
  form: SsoPolicyForm;

  TYPE = SsoPolicyType;

  constructor() { }

  ngOnInit() {
  }

  timePolicy(): BaseDateTimeSsoForm {
    return this.form as BaseDateTimeSsoForm;
  }

}
