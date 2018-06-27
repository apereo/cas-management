import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Messages} from 'app/messages';
import {ActivatedRoute, Router} from '@angular/router';
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
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: String[]}) => {
          this.dataSource = new MatTableDataSource(data.resp);
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
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  view(domain: String) {
    this.router.navigate(['services', domain]);
  }
}
