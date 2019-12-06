import {Component, Input, OnInit} from '@angular/core';
import {PublicKeyForm} from './pubkey.form';

@Component({
  selector: 'lib-pubkey',
  templateUrl: './pubkey.component.html'
})
export class PubkeyComponent implements OnInit {

  @Input()
  control: PublicKeyForm;

  constructor() {
  }

  ngOnInit() {
  }

}
