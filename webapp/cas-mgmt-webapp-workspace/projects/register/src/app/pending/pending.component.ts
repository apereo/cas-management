import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {PendingItem} from '../domain/pending-item.model';
import {PaginatorComponent, AppConfigService} from '@apereo/mgmt-lib';
import {MatSort} from '@angular/material/sort';
import {RegisterService} from '../core/register.servivce';
import {MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {ControlsService} from '../project-share/controls/controls.service';

/**
 * Component to display pending submissions from the logged in user.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})

export class PendingComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<PendingItem>;
  displayedColumns = [];
  loading = false;
  selectedItem: PendingItem;
  subscription: Subscription;

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              public service: RegisterService,
              public appService: AppConfigService,
              public controls: ControlsService,
              public dialog: MatDialog,
              public mediaObserver: MediaObserver,
              public router: Router) {
    controls.title = 'Pending';
    controls.icon = 'list';
  }

  /**
   * Extracts pending items from the resolver and loads the table.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: PendingItem[]}) => {
        if (data.resp) {
          this.dataSource = new MatTableDataSource(data.resp);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator.paginator;
        } else {
          this.appService.showSnackBar('Unable to retrieve service listing.');
        }
      });
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
    this.controls.showEdit = false;
    this.controls.showRefresh = true;
    this.subscription = this.controls.refresh.subscribe(() => this.refresh());
  }

  /**
   * Destroy subscription.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Sets the columns to display based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this. displayedColumns = ['actions', 'serviceId', 'serviceType'];
    } else {
      this. displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'submitted'];
    }
  }

  /**
   * Refreshes data.
   */
  refresh() {
    this.getServices();
  }

  /**
   * Gets all pending submissions.
   */
  getServices() {
    this.service.getSubmissions()
      .subscribe(resp => {
        this.dataSource.data = resp;
      },
        () => this.appService.showSnackBar('Unable to retrieve service listing.')
      );
  }

  /**
   * Navigates the router to the FormComponent to edit the selected submisson.
   */
  edit() {
    this.router.navigate(['form/edit', this.selectedItem.id]).then();
  }

  /**
   * Deletes a pending submission.
   */
  remove() {
    this.service.deletePending(this.selectedItem.id as string)
      .subscribe(() => {
        this.refresh(); }
      );
  }

}
