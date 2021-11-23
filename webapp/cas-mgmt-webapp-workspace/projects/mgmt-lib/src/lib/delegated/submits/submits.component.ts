import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SubmitService} from './submits.service';
import {Branch} from '@apereo/mgmt-lib/src/lib/model';
import {AppConfigService, ControlsService, PaginatorComponent, RevertComponent} from '@apereo/mgmt-lib/src/lib/ui';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { SpinnerService } from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display history of pull requests and allows reverting them.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-submits',
  templateUrl: './submits.component.html',
  styleUrls: ['./submits.component.css']
})

export class SubmitsComponent implements OnInit, OnDestroy {

  displayedColumns = ['actions', 'status', 'name', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  selectedItem: Branch;
  revertBranch: Branch;

  subscription: Subscription;

  constructor(private service: SubmitService,
              private spinner: SpinnerService,
              public controls: ControlsService,
              public dialog: MatDialog,
              public app: AppConfigService,
              public router: Router,
              private route: ActivatedRoute) {
    this.controls.title = 'Submits';
    this.controls.icon = 'file_upload';
  }

  /**
   * Starts the component by pulling the branches from the resolver.
   */
  ngOnInit() {
    this.route.data.subscribe((data: { resp: Branch[]}) => {
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
    this.controls.resetButtons();
    this.controls.showRefresh = true;
    this.subscription = this.controls.refresh.subscribe(() => this.refresh());
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Refreshes the data in the view.
   */
  refresh() {
    this.spinner.start();
    this.service.getSubmits('Refreshing')
      .subscribe(resp => {
        setTimeout(() => this.spinner.stop(), 1000);
        this.dataSource.data = resp;
      });
  }

  /**
   * Navigates to the notes component for the selected item.
   */
  getNotes() {
    this.router.navigate(['notes', this.selectedItem.id]).then();
  }

  /**
   * Determines the status of a branch when rendering it in the view.
   *
   * @param branch - branch being rendered.
   */
  status(branch: Branch): string {
    if (!branch) {
      return;
    }
    if (branch.accepted) {
      return 'Accepted';
    } else if (branch.reverted) {
      return 'Reverted';
    } else if (branch.rejected) {
      return 'Rejected';
    } else {
      return 'Pending';
    }
  }

  /**
   * Opens the Revert dialog for confirmation from user.
   */
  openModalRevert() {
    this.dialog.open(RevertComponent, {
      data: this.selectedItem,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.revert();
      }
    });
    this.revertBranch = this.selectedItem;
  }

  /**
   * Reverts the selected pull request.
   */
  private revert() {
    this.service.revert(this.revertBranch.name)
      .subscribe(() => {
        this.app.showSnackBar('Branch has been reverted');
        this.refresh();
      });
  }
}
