import {Component, forwardRef, OnInit} from '@angular/core';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {OidcRegisteredService} from '../../../domain/oauth-service';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-oidc-options',
  templateUrl: './oidc-options.component.html',
  styleUrls: ['./oidc-options.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => OidcOptionsComponent)
  }]
})
export class OidcOptionsComponent extends HasControls implements OnInit {

  isOidc: boolean;
  isWsFed: boolean;
  oidcService: OidcRegisteredService;
  original: OidcRegisteredService;
  scopes: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('scopes', this.scopes);
    return c;
  }

  ngOnInit() {
    this.isOidc = OidcRegisteredService.instanceOf(this.data.service);
    this.isWsFed = WSFederationRegisterdService.instanceOf(this.data.service);
    if (this.isOidc) {
      this.oidcService = this.data.service as OidcRegisteredService;
      this.original = this.data.original as OidcRegisteredService;
    }
    const og: any = this.original ? this.original : {};
    this.scopes = new MgmtFormControl(this.oidcService.scopes, og.scopes);
  }

}
