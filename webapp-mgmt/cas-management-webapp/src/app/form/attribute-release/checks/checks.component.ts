import {Component, OnInit, Input} from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';

@Component({
  selector: 'app-attribute-release-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
