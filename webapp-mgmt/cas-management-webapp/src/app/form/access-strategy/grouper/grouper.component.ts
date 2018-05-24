import {Component, OnInit} from '@angular/core';
import {GrouperRegisteredServiceAccessStrategy} from '../../../../domain/access-strategy';
import {Messages} from '../../../messages';
import {Data} from '../../data';

@Component({
  selector: 'app-grouper',
  templateUrl: './grouper.component.html',
  styleUrls: ['./grouper.component.css']
})
export class GrouperComponent implements OnInit {

  accessStrategy: GrouperRegisteredServiceAccessStrategy;
  original: GrouperRegisteredServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.accessStrategy = data.service.accessStrategy as GrouperRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GrouperRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
