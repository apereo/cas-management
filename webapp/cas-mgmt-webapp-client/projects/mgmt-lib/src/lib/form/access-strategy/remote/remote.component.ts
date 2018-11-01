import {Component, OnInit} from '@angular/core';
import {RemoteEndpointServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent implements OnInit {

  accessStrategy: RemoteEndpointServiceAccessStrategy;
  original: RemoteEndpointServiceAccessStrategy;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy as RemoteEndpointServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as RemoteEndpointServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
