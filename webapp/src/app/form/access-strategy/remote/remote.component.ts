import {Component, OnInit} from '@angular/core';
import {RemoteEndpointServiceAccessStrategy} from '../../../../domain/access-strategy';
import {Messages} from '../../../messages';
import {Data} from '../../data';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent implements OnInit {

  accessStrategy: RemoteEndpointServiceAccessStrategy;
  original: RemoteEndpointServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.accessStrategy = data.service.accessStrategy as RemoteEndpointServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as RemoteEndpointServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
