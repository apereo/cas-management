import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
