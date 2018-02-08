import { Component, OnInit } from '@angular/core';
import {Data} from '../data';
import {Messages} from '../../messages';

@Component({
  selector: 'app-responsetype',
  templateUrl: './responsetype.component.html',
  styleUrls: ['./responsetype.component.css']
})
export class ResponsetypeComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
