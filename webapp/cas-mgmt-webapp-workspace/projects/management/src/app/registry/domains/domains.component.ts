import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatTableDataSource } from '@angular/material';
import {PaginatorComponent} from 'shared-lib';
import {DomainRpc} from 'domain-lib';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {
  displayedColumns = ['actions', 'name'];
  dataSource: MatTableDataSource<DomainRpc>;
  selectedItem: DomainRpc;


  @ViewChild(PaginatorComponent, { static: true }) paginator: PaginatorComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.route.data
      .subscribe((data: {resp: DomainRpc[]}) => {
          this.dataSource = new MatTableDataSource(data.resp);
          this.dataSource.paginator = this.paginator.paginator;
        },
        error => this.snackBar.open(
          'Failed to load domains',
          'Dismiss',
          {duration: 5000}
        )
      );
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  view(domain: string) {
    this.router.navigate(['registry/services', domain]);
  }
}
