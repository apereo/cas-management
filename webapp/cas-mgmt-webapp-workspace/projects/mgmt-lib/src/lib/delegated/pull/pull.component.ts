import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Branch, DiffEntry} from '@apereo/mgmt-lib/src/lib/model';
import {ActivatedRoute, Router} from '@angular/router';
import {PullService} from './pull.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  AcceptComponent,
  RejectComponent,
  AppConfigService,
  PaginatorComponent,
  ControlsService
} from '@apereo/mgmt-lib/src/lib/ui';
import {MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import { SpinnerService } from '@apereo/mgmt-lib/src/lib/ui';
import { UserService } from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display a list of open pull request for admins to review and accept.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.css']
})

export class PullComponent implements OnInit, OnDestroy {

  displayedColumns = ['actions', 'branch', 'status', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  rejectBranch: Branch;
  acceptBranch: Branch;
  selectedBranch: Branch;
  changes: DiffEntry[];

  showPending = true;
  showAccepted: boolean;
  showRejected: boolean;

  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PullService,
              private location: Location,
              private controls: ControlsService,
              private spinner: SpinnerService,
              public dialog: MatDialog,
              public app: AppConfigService,
              public mediaObserver: MediaObserver,
              public userService: UserService) {
    this.controls.title = 'Pull Requests';
    this.controls.icon = 'file_upload';
  }

  /**
   * Starts the component getting data form the resolver to insert into the table.
   */
  ngOnInit() {
    this.route.data.subscribe((data: {resp: Branch[]}) => {
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
    this.controls.showRefresh = true;
    this.subscription = this.controls.refresh.subscribe(() => this.refresh());
  }

  /**
   * Destroy Subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Sets the columns that can be displayed based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'branch', 'status'];
    } else {
      this.displayedColumns = ['actions', 'branch', 'status', 'message'];
    }
  }

  /**
   * Refreshes data in the view by making a call to the server for all open pull requests.
   */
  refresh() {
    const opts = [];
    if (this.showPending) {
      opts.push('SUBMITTED');
    }
    if (this.showAccepted) {
      opts.push('ACCEPTED');
    }
    if (this.showRejected) {
      opts.push('ACCEPTED');
    }
    this.spinner.start();
    this.service.getBranches(opts, 'Refreshing')
      .subscribe(resp => {
        setTimeout(() => this.spinner.stop(), 1000);
        this.dataSource.data = resp;
      });
    this.controls.gitStatus();
  }

  /**
   * Navigates to the changes screen passing with passes in branch or the selected branch if null is passed.
   *
   * @param branch - bracnch to show changes for
   */
  viewChanges(branch?: Branch) {
    if (!this.isAdmin()) { return; }
    if (branch) {
      this.selectedBranch = branch;
    }
    this.router.navigate(['../version-control/changes', this.selectedBranch.name]).then();
  }

  /**
   * Opens the dialog for the accept component to allow the admin to confirm accepting the changes.
   */
  openAcceptModal() {
    this.dialog.open(AcceptComponent, {
      data: [],
    }).afterClosed().subscribe(result => {
      if (result) {
        this.accept(result);
      }
    });
    this.acceptBranch = this.selectedBranch;
  }

  /**
   * Calls the service to accept the pull request and adds the passed note.
   *
   * @param note - note added by admin
   */
  private accept(note: string) {
    this.service.accept(this.acceptBranch, note)
      .subscribe(() => this.showSnackAndRefresh('Branch has been merged'));
  }

  /**
   * Opens the reject dialog to allow the admin to add a rejection note.
   */
  openRejectModal() {
    this.dialog.open(RejectComponent, {
      data: this.selectedBranch,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.reject(result);
      }
    });
    this.rejectBranch = this.selectedBranch;
  }

  /**
   * Calls the service to reject the pull request with the passed reject note.
   *
   * @param note - note why the admin rejected the request
   */
  private reject(note: string) {
    this.service.reject(this.rejectBranch, note)
      .subscribe(() => this.showSnackAndRefresh('Branch has been marked as rejected'));
  }

  /**
   * Navigates to the Notes component for the selected branch.
   */
  getNotes() {
    this.router.navigate(['./delegated/notes', this.selectedBranch.id]);
  }

  /**
   * Determines the status of the branch for display styling in the view.
   *
   * @param branch - branch being rendered
   */
  status(branch: Branch): string {
    if (branch) {
      if (branch.accepted) {
        return 'Accepted';
      } else if (branch.rejected) {
        return 'Rejected';
      } else {
        return 'Pending';
      }
    }
  }

  /**
   * Displays the snack bar with the passed message and also refreshes the data in the view.
   *
   * @param msg - message to display
   */
  showSnackAndRefresh(msg: string) {
    this.app.showSnackBar(msg);
    this.refresh();
  }

  /**
   * Returns true if the logged in user is an admin.
   */
  isAdmin(): boolean {
    return this.userService.user && this.userService.user.administrator;
  }
 }
