import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatTableDataSource } from '@angular/material';
import {PaginatorComponent} from 'mgmt-lib';
import {ActivatedRoute, Router} from '@angular/router';

export interface DomainRow {
  name: String;
}

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {
  displayedColumns = ['actions', 'name'];
  dataSource: MatTableDataSource<DomainRow>;
  selectedItem: String;


  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.route.data.subscribe((data: {resp: String[]}) => {
          const dataRows: DomainRow[] = [];

          for (let r of data.resp) {
            dataRows.push({name: r});
          }

          this.dataSource = new MatTableDataSource(dataRows);
          this.dataSource.paginator = this.paginator.paginator;
         },
          error => {
            console.log(error),
              this.snackBar
                .open('Failed to load domains',
                  'Dismiss',
            {duration: 5000}
                );
          }
      );
  }

  doFilter(val: string) {
    console.log("val = " + val);
    if (!this.dataSource) { return; }
    console.log("setting val");
    this.dataSource.filter = val;
  }

  view(domain: String) {
    this.router.navigate(['services', domain]);
  }
}
