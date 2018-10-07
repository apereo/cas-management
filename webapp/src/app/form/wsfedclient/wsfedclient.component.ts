import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {Data} from '../data';

@Component({
  selector: 'app-wsfedclient',
  templateUrl: './wsfedclient.component.html',
  styleUrls: ['./wsfedclient.component.css']
})
export class WsfedclientComponent implements OnInit {

  service: WSFederationRegisterdService;
  original: WSFederationRegisterdService;

  constructor(public messages: Messages,
              public data: Data) {
    this.service = data.service as WSFederationRegisterdService;
    this.original = data.original && data.original as WSFederationRegisterdService;
  }

  ngOnInit() {
  }

}
