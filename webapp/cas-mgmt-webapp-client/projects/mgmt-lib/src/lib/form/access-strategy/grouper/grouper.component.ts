import {Component, OnInit} from '@angular/core';
import {GrouperRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-grouper',
  templateUrl: './grouper.component.html',
  styleUrls: ['./grouper.component.css']
})
export class GrouperComponent implements OnInit {

  accessStrategy: GrouperRegisteredServiceAccessStrategy;
  original: GrouperRegisteredServiceAccessStrategy;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy as GrouperRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GrouperRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
