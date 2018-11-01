import { Component, OnInit } from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SamlSecurityComponent implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;

  constructor(public data: DataRecord) {
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  ngOnInit() {
  }

}
