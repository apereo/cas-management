import {Component, forwardRef, OnInit} from '@angular/core';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-wsfedclient',
  templateUrl: './wsfedclient.component.html',
  styleUrls: ['./wsfedclient.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => WsfedclientComponent)
  }]
})
export class WsfedclientComponent extends HasControls implements OnInit {

  service: WSFederationRegisterdService;
  original: WSFederationRegisterdService;
  realm: MgmtFormControl;
  appliesTo: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as WSFederationRegisterdService;
    this.original = data.original && data.original as WSFederationRegisterdService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('realm', this.realm);
    c.set('appliesTo', this.appliesTo);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.realm = new MgmtFormControl(this.service.realm, og.realm);
    this.appliesTo = new MgmtFormControl(this.service.appliesTo, og.appliesTo);
  }

}
