import {Component, OnInit, ViewChild} from '@angular/core';
import {AppConfigService, ControlsService, PaginatorComponent, SamlAddComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {SamlService} from './saml.service';
import {MatSort} from '@angular/material/sort';
import {MediaObserver} from '@angular/flex-layout';
import {BaseServicesComponent} from '../base-services.component';
import {RegistryService} from '../registry.service';

/**
 * Component for displaying list of Saml services in the registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-saml',
  templateUrl: './saml.component.html',
  styleUrls: ['./saml.component.css']
})
export class SamlComponent extends BaseServicesComponent {
  deleteItem: ServiceItem;
  selectedItem: ServiceItem;
  revertItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'description'];

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(route: ActivatedRoute,
              router: Router,
              service: RegistryService,
              private samlService: SamlService,
              appService: AppConfigService,
              controls: ControlsService,
              dialog: MatDialog,
              mediaObserver: MediaObserver) {
    super(service, route, router, appService, controls, dialog, mediaObserver);
    this.controls.icon = 'list';
    this.controls.title = 'SAML Services';
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
   * Navigates the selected item to the MetadataComponent.
   */
  getMetadata() {
    this.router.navigate(['registry/metadata', this.selectedItem.assignedId]).then();
  }

  /**
   * Calls the server to retrieve all registered OAuth services.
   */
  getServices() {
    this.samlService.getServices()
      .subscribe(resp => this.dataSource.data = resp,
       () => this.appService.showSnackBar('Unable to retrieve service listing.')
      );
  }

  /**
   * Opens a dialog for user to choose if new service is OAuth or OIDC.
   */
  createService() {
    this.dialog.open(SamlAddComponent, {
      width: 'auto',
      position: {top: '100px'},
      data: {showNew: true}
    }).afterClosed().subscribe(resp => {
      if (resp === 'upload') {
        this.router.navigate(['form/saml']).then();
      }
    });
  }
}
