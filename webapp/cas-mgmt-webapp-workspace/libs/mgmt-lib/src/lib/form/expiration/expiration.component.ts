import {Component, Input, OnInit} from '@angular/core';
import {ExpirationForm} from './expiration-form';

@Component({
  selector: 'lib-expiration',
  templateUrl: './expiration.component.html'
})
export class ExpirationComponent implements OnInit {

  @Input()
  form: ExpirationForm;

  constructor() {
  }

  ngOnInit() {
  }

}
