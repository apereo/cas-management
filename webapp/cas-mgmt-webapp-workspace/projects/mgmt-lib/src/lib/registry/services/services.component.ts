import {Component, OnInit} from '@angular/core';
import {AppConfigService, ControlsService} from '@apereo/mgmt-lib/src/lib/ui';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MediaObserver} from '@angular/flex-layout';
import {BaseServicesComponent} from '../base-services.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {RegistryService} from '../registry.service';

/**
 * Component to display a list of services in a registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent extends BaseServicesComponent implements OnInit {
  domain: string;

  constructor(route: ActivatedRoute,
              router: Router,
              service: RegistryService,
              appService: AppConfigService,
              controls: ControlsService,
              dialog: MatDialog,
              mediaObserver: MediaObserver) {
    super(service, route, router, appService, controls, dialog, mediaObserver);
    this.controls.icon = 'list';
    this.controls.title = 'Services';
  }

  /**
   * Extracts list of services from the resolver and loads them into the table.
   */
  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe((params) => this.domain = params.domain);

  }

  /**
   * Calls the server to retrieve all registered services.
   */
  getServices() {
    this.service.getServices(this.domain)
      .subscribe(resp => this.dataSource.data = resp,
       () => this.appService.showSnackBar('Unable to retrieve service listing.')
      );
  }

  /**
   * Creates a new service by navigating to FormComponent with id -1.
   */
  createService() {
    this.router.navigate(['form/edit/-1']).then();
  }

  /**
   * .
   * @param event - event
   */
  drop(event: CdkDragDrop<ServiceItem[]>) {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource._updateChangeSubscription();
    setTimeout( () => this.updateIndexes(), 10);
  }

  /**
   * Call server for services that changed
   */
  updateIndexes() {
    const chgs = [];
    this.dataSource.data.forEach((s, index) => {
      if (index !== s.evalOrder) {
        s.evalOrder = index;
        chgs.push(s);
      }
    });
    if (chgs.length > 0) {
      this.service.updateOrder(chgs).subscribe(() => this.refresh());
    }
  }
}
