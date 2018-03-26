import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Messages} from '../messages';
import {ControlsService} from '../controls/controls.service';
import {ServiceItem} from '../../domain/service-item';
import {AppConfigService} from '../app-config.service';
import {DeleteComponent} from '../delete/delete.component';
import {SubmissionsService} from './submissions.service';
import {ImportService} from '../import/import.service';
import {PaginatorComponent} from '../paginator/paginator.component';
import {RejectComponent} from '../reject/reject.component';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})

export class SubmissionsComponent implements OnInit {
  rejectItem: ServiceItem;
  domain: String;
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'description'];

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              public service: SubmissionsService,
              public importService: ImportService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public controlsService: ControlsService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
          if (!data.resp) {
            this.snackBar.open(this.messages.management_services_status_listfail, 'dismiss', {
              duration: 5000
            });
          }
          setTimeout(() => {
            this.dataSource.data = data.resp;
          }, 10);
        }
      );
    this.route.params.subscribe((params) => this.domain = params['domain']);
  }

  serviceEdit() {
    this.importService.importSubmission(this.selectedItem.assignedId).then(resp => {
      this.router.navigate(['importService']);
    });
  }

  getYaml() {
    this.router.navigate(['/yaml', this.selectedItem.assignedId]);
  }

  getJson() {
    this.router.navigate(['/json', this.selectedItem.assignedId]);
  }

  diff() {
    this.router.navigate(['diffSubmission', {id: this.selectedItem.assignedId}])
  }

  accept() {
    this.service.accept(this.selectedItem.assignedId)
      .then(resp => {
        this.snackBar.open("Submission has been accepted", "Dismiss", {
          duration: 5000
        });
        this.refresh();
      });
  }

  openRejectModal() {
    const dialogRef = this.dialog.open(RejectComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reject(result);
      }
    });
    this.rejectItem = this.selectedItem;
  }

  reject(note: String) {
    this.service.reject(this.rejectItem.assignedId, note)
      .then(resp => {
        this.snackBar.open('Submitted Service has been rejected', 'Dismiss', {
          duration: 5000
        });
        this.refresh();
      });
  }

  refresh() {
    this.getServices();
    this.controlsService.gitStatus();
  }

  getServices() {
    this.service.getSubmissions()
      .then(resp => this.dataSource.data = resp)
      .catch((e: any) => this.snackBar.open(this.messages.management_services_status_listfail, 'Dismiss', {
        duration: 5000
      }));
  }

}
