import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfigService, ControlsService, OAuthAddComponent } from '@apereo/mgmt-lib/src/lib/ui';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WsFedService } from './wsfed.service';
import { MatSort } from '@angular/material/sort';
import { MediaObserver } from '@angular/flex-layout';
import { BaseServicesComponent } from '../base-services.component';
import { RegistryService } from '../registry.service';

/**
 * Component to display list of all registered OAuth services.
 *
 * @author Travis Schmidt
 */
@Component({
    selector: 'lib-wsfed',
    templateUrl: './wsfed.component.html',
    styleUrls: []
})
export class WsFedComponent extends BaseServicesComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(route: ActivatedRoute,
        router: Router,
        service: RegistryService,
        private wsfedService: WsFedService,
        appService: AppConfigService,
        controls: ControlsService,
        dialog: MatDialog,
        mediaObserver: MediaObserver) {
        super(service, route, router, appService, controls, dialog, mediaObserver);
        this.controls.icon = 'list';
        this.controls.title = 'WS Federation Services';
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
        this.wsfedService.getServices()
            .subscribe(resp => this.dataSource.data = resp,
                () => this.appService.showSnackBar('Unable to retrieve service listing.')
            );
    }

    /**
   * Creates a new service by navigating to FormComponent with id -1.
   */
    createService() {
        this.router.navigate(['./form/wsfed']);
    }
}
