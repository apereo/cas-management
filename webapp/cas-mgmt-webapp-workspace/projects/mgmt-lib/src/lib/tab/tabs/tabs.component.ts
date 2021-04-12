import {Component, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Base level Component that displays/updates a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent {

  id: string;
  created: false;

  @ViewChild('tabGroup', { static: true })
  tabGroup: MatTabGroup;

  @Input()
  tabs: Array<string[]> = [];

  constructor(public route: ActivatedRoute,
              public router: Router,
              public service: FormService,
              public location: Location,
              public snackBar: MatSnackBar) {
  }

  /**
   * Handles the selected tab change to route the the outlet to the selected tab.
   *
   * @param event - tab change event
   */
  goto(event: MatTabChangeEvent) {
    this.navTo(this.tabs[event.index][0]);
  }

  /**
   * Routes the outlet to the key of the selected tab.
   *
   * @param tab - tab id
   */
  navTo(tab: string) {
    const route: any[] = [{outlets: {form: [tab]}}];
    this.router.navigate(route, {skipLocationChange: true, relativeTo: this.route, replaceUrl: true}).then();
  }


}
