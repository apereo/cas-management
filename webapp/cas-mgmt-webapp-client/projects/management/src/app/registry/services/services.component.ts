import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem, AppConfigService, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceViewService} from './service.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DeleteComponent} from '../delete/delete.component';
import {RevertComponent} from '@app/project-share';
import {BreakpointObserver} from '@angular/cdk/layout';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  deleteItem: ServiceItem;
  domain: string;
  selectedItem: ServiceItem;
  revertItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'description'];

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ServiceViewService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public spinner: SpinnerService,
              public breakObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      }
    );
    this.route.params.subscribe((params) => this.domain = params['domain']);
    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this.displayedColumns = ['actions', 'serviceId'];
        } else {
          this.displayedColumns = ['actions', 'name', 'serviceId', 'description'];
        }
      });
  }

  ngAfterViewInit() {

  }

  serviceEdit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['form/edit', this.selectedItem.assignedId]);
  }

  getYaml() {
    this.router.navigate(['registry/yaml', this.selectedItem.assignedId]);
  }

  getJson() {
    this.router.navigate(['registry/json', this.selectedItem.assignedId]);
  }

  serviceDuplicate() {
    this.router.navigate(['form/duplicate', this.selectedItem.assignedId]);
  }

  openModalDelete() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
    this.deleteItem = this.selectedItem;
  }

  openModalRevert() {
    const dialogRef = this.dialog.open(RevertComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.revert();
      }
    });
    this.revertItem = this.selectedItem;
  }

  delete() {
    this.spinner.start('Deleting service');
    this.service.deleteService(+this.deleteItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.handleDelete(this.deleteItem.name),
       (e: any) => this.snackBar
         .open(e.message || e.text(),
           'Dismiss',
           {duration: 5000}
         )
      );
  }

  handleDelete(name: string) {
    this.snackBar
      .open(name + ' has been successfully deleted.',
        'Dismiss',
        {duration: 5000}
      );
    this.refresh();
  }

  history() {
    const fileName: string = (this.selectedItem.name + '-' + this.selectedItem.assignedId + '.json').replace(/ /g, '');
    this.router.navigate(['version-control/history', fileName]);
  }

  revert() {
    const fileName: string = (this.revertItem.name + '-' + this.revertItem.assignedId + '.json').replace(/ /g, '');
    this.spinner.start('Reverting service');
    this.service.revert(fileName)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(this.handleRevert);
  }

  handleRevert() {
    this.refresh();
    this.snackBar
      .open('Change has been reverted',
        'Dismiss',
        {duration: 5000}
      );
  }


  refresh() {
    this.getServices();
  }

  getServices() {
    this.spinner.start('Loading services');
    this.service.getServices(this.domain)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp,
       () => this.snackBar
         .open('Unable to retrieve service listing.',
           'Dismiss',
           {duration: 5000}
         )
      );
  }

  moveUp(a: ServiceItem) {
    const index: number = this.dataSource.data.indexOf(a);
    if (index > 0) {
      const b: ServiceItem = this.dataSource.data[index - 1];
      a.evalOrder = index - 1;
      b.evalOrder = index;
      this.spinner.start('Updating order');
      this.service.updateOrder(a, b)
        .pipe(finalize(() => this.spinner.stop()))
        .subscribe(resp => this.refresh());
    }
  }

  moveDown(a: ServiceItem) {
    const index: number = this.dataSource.data.indexOf(a);
    if (index < this.dataSource.data.length - 1) {
      const b: ServiceItem = this.dataSource.data[index + 1];
      a.evalOrder = index + 1;
      b.evalOrder = index;
      this.spinner.start('Updating order');
      this.service.updateOrder(a, b)
        .pipe(finalize(() => this.spinner.stop()))
        .subscribe(this.refresh);
    }
  }

  showMoveDown(): boolean {
    if (!this.selectedItem) {
      return false;
    }
    const index = this.dataSource.data.indexOf(this.selectedItem);
    return index < this.dataSource.data.length - 1;
  }

  showMoveUp(): boolean {
    if (!this.selectedItem) {
      return false;
    }
    const index = this.dataSource.data.indexOf(this.selectedItem);
    return index > 0;
  }

  showHistory(): boolean {
    return this.appService.config.versionControl &&
           this.selectedItem &&
           this.selectedItem.status !== 'ADD';
  }

  showRevert(): boolean {
    return this.appService.config.versionControl &&
           this.selectedItem &&
           this.selectedItem.status === 'MODIFY';
  }

  added(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'ADDED';
  }

  modified(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'MODIFY';
  }

  deleted(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'DELETE';
  }

  status(row: ServiceItem): string {
    return this.appService.config.versionControl ? row.status : '';
  }
}
