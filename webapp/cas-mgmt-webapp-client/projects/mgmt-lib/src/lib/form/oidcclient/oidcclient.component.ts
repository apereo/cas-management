import {Component, OnInit} from '@angular/core';
import {OidcRegisteredService} from '../../domain/oauth-service';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-oidcclient',
  templateUrl: './oidcclient.component.html',
  styleUrls: ['./oidcclient.component.css']
})
export class OidcclientComponent implements OnInit {

  service: OidcRegisteredService;
  original: OidcRegisteredService;
  showOAuthSecret: boolean;

  constructor(public data: DataRecord) {
    this.service = data.service as OidcRegisteredService;
    this.original = data.original && data.original as OidcRegisteredService;
  }

  ngOnInit() {
    if (!this.service.scopes) {
      this.service.scopes = [];
    }
  }

}
