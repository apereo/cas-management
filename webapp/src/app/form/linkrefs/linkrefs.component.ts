import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';

@Component({
  selector: 'app-linkrefs',
  templateUrl: './linkrefs.component.html'
})
export class LinkrefsComponent implements OnInit {


  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
