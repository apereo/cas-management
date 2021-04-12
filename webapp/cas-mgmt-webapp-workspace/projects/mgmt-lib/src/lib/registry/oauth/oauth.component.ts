import {Component, OnInit, ViewChild} from '@angular/core';
import {AppConfigService, ControlsService, OAuthAddComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {OauthService} from './oauth.service';
import {MatSort} from '@angular/material/sort';
import {MediaObserver} from '@angular/flex-layout';
import {BaseServicesComponent} from '../base-services.component';
import {RegistryService} from '../registry.service';

/**
 * Component to display list of all registered OAuth services.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent extends BaseServicesComponent {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(route: ActivatedRoute,
              router: Router,
              service: RegistryService,
              private oauthService: OauthService,
              appService: AppConfigService,
              controls: ControlsService,
              dialog: MatDialog,
              mediaObserver: MediaObserver) {
    super(service, route, router, appService, controls, dialog, mediaObserver);
    this.controls.icon = 'list';
    this.controls.title = 'OAuth Services';
  }

  /**
   * Recieves text from filter input on the screen and applies it to the table.
   *
   * @param val - partial text to filter by
   */
  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  /**
   * Calls the server to retrieve all registered OAuth services.
   */
  getServices() {
    this.oauthService.getServices()
      .subscribe(resp => this.dataSource.data = resp,
       () => this.appService.showSnackBar('Unable to retrieve service listing.')
      );
  }

  /**
   * Opens a dialog for user to choose if new service is OAuth or OIDC.
   */
  createService() {
    this.dialog.open(OAuthAddComponent)
      .afterClosed().subscribe(type => {
        if (type) {
          this.router.navigate(['form/' + type]).then();
        }
      });
  }
}
