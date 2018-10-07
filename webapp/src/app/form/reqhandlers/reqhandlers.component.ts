import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';

@Component({
  selector: 'app-reqhandlers',
  templateUrl: './reqhandlers.component.html'
})
export class ReqhandlersComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
