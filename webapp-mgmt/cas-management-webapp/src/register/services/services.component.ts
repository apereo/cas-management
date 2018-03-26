import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Messages} from '../../app/messages';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceViewService} from './service.service';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'register-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  domain: String;
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'description', 'duo', 'expires'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: ServiceViewService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
        if (!data.resp || data.resp.length == 0) {
          this.router.navigate(["wizzard"]);
        } else {
          setTimeout(() => {
            this.dataSource.data = data.resp;
          }, 10);
        }
      }
    );
    this.route.params.subscribe((params) => this.domain = params['domain']);
  }

  ngAfterViewInit() {

  }

  edit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['/registerForm', this.selectedItem.assignedId]);
  }

  renew() {
    this.service.renew(this.selectedItem.assignedId as string)
      .then(resp => {
        this.getServices();
        this.snackBar.open("Service Renewed", "Dismiss", {
            duration: 5000
          }
        )
      });
  }

  remove() {

  }

  getServices() {
    this.service.getServices()
      .then(resp => this.dataSource.data = resp)
      .catch((e: any) => this.snackBar.open(this.messages.management_services_status_listfail, 'Dismiss', {
        duration: 5000
      }));
  }

  refresh() {

  }

  showRenew() {
    if (this.selectedItem) {
      let  exp: Date = new Date(this.selectedItem.expires as string);
      exp.setDate(exp.getDate() - 30);
      if(new Date().getTime() >= exp.getTime()) {
        return true;
      }
    }
    return false;
  }

}
