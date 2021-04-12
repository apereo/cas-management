import {Component, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {AppConfigService} from '../app-config.service';

/**
 * Wraps the MatPaginator so user preference for page size can be remembered and used between
 * route navigations.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(public appService: AppConfigService) {

  }

  /**
   * Handles page size event change so it can be saved and used again on component navigation
   * to display the user preference for results per page.
   *
   * @param evt - PageEvent
   */
  pageEvent(evt: PageEvent) {
    this.appService.pageSize = evt.pageSize;
  }

}
