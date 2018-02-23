import {Component, OnInit} from '@angular/core';
import {TabBaseComponent} from '../tab-base';
import {WSFederationRegisterdService} from '../../../domain/wsed-service';
import {OidcRegisteredService} from '../../../domain/oauth-service';

@Component({
  selector: 'app-tab-attrrelease',
  templateUrl: './tab-attrrelease.component.html'
})
export class TabAttrreleaseComponent extends TabBaseComponent implements OnInit {
  isOidc: boolean;
  isWsFed: boolean;
  oidcService: OidcRegisteredService;

 ngOnInit() {
   super.ngOnInit();
   this.isOidc = OidcRegisteredService.instanceOf(this.data.service);
   this.isWsFed = WSFederationRegisterdService.instanceOf(this.data.service);
   if (this.isOidc) {
     this.oidcService = this.data.service as OidcRegisteredService;
   }
  }
}
