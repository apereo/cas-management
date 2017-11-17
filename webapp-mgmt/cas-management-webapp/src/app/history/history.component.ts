import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from './history.service';
import {History} from '../../domain/history';
import {Location} from '@angular/common';
import {ChangesService} from '../changes/changes.service';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['actions', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<History>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fileName: String;

  selectedItem: History;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: HistoryService,
              private changeService: ChangesService,
              private location: Location,
              public  snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.route.data
      .subscribe((data: { resp: History[]}) => {
        if (!data.resp) {
          this.snackBar.open(this.messages.management_services_status_listfail, 'dismiss', {
              duration: 5000
          });
        }
        setTimeout(() => {
          this.dataSource.data = data.resp;
        },10);
      });
    this.route.params.subscribe((params) => this.fileName = params['fileName']);
  }

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.id]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.commit as string, this.selectedItem.path)
      .then(resp => this.snackBar.open('Service successfully restored from history.', 'dismiss', {
        duration: 5000
      }));
  }

  viewDiff() {
    this.router.navigate(['/diff', {oldId: this.dataSource.data[0].id, newId: this.selectedItem.id}]);
  }

  viewJSON() {
    this.router.navigate(['/viewJson', this.selectedItem.id]);
  }

  viewYaml() {
    this.router.navigate(['/viewYaml', this.selectedItem.id]);
  }
}


