import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';

@Component({
  selector: 'app-themeid',
  templateUrl: './themeid.component.html'
})
export class ThemeidComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
