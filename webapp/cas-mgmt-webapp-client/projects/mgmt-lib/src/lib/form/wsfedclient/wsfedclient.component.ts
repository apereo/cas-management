import {Component, OnInit} from '@angular/core';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-wsfedclient',
  templateUrl: './wsfedclient.component.html',
  styleUrls: ['./wsfedclient.component.css']
})
export class WsfedclientComponent implements OnInit {

  service: WSFederationRegisterdService;
  original: WSFederationRegisterdService;

  constructor(public data: DataRecord) {
    this.service = data.service as WSFederationRegisterdService;
    this.original = data.original && data.original as WSFederationRegisterdService;
  }

  ngOnInit() {
  }

}
