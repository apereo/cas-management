import { Component, OnInit } from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-nameid',
  templateUrl: './nameid.component.html',
  styleUrls: ['./nameid.component.css']
})
export class SamlNameidComponent implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;

  constructor(public data: DataRecord) {
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  ngOnInit() {
  }

}
