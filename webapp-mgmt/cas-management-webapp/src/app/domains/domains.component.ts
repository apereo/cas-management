import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource, PageEvent} from '@angular/material';
import {DomainService} from './domain.service';
import {Messages} from 'app/messages';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppConfigService} from '../app-config.service';
import {PaginatorComponent} from '../paginator/paginator.component';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {
  displayedColumns = ['actions', 'name'];
  dataSource: MatTableDataSource<String>;
  selectedItem: String;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  constructor(public messages: Messages,
              private router: Router,
              private domainService: DomainService,
              public snackBar: MatSnackBar,
              private location: Location) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.domainService.getDomains()
      .then(resp => this.dataSource.data = resp)
      .catch(e => {console.log(e); this.snackBar.open('Failed to load domains', 'Dismiss'); });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  view(domain: String) {
    this.router.navigate(['services', domain]);
  }
}
