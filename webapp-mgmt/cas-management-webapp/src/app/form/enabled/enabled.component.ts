import {Component, OnInit, Input} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';


@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
})
export class EnabledComponent implements OnInit {


  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
