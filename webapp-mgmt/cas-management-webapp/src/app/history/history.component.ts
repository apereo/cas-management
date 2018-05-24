import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from './history.service';
import {History} from '../../domain/history';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {PaginatorComponent} from '../paginator/paginator.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['actions', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<History>;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  fileName: String;

  selectedItem: History;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: HistoryService,
              public  snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: History[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.fileName = params['fileName']);
  }

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.id]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.commit as string, this.selectedItem.path)
      .subscribe(
        () => this.snackBar
          .open('Service successfully restored from history.',
            'dismiss',
            {duration: 5000}
        )
      );
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
