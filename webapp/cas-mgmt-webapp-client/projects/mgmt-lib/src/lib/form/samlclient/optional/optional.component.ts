import { Component, OnInit } from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.css']
})
export class SamlOptionalComponent implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;

  constructor(public data: DataRecord) {
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  ngOnInit() {
  }

}
