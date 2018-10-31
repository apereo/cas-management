import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {AppConfigService} from '../app-config.service';

@Component({
  selector: 'lib-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(public appService: AppConfigService) {

  }

  ngOnInit() {
  }

  pageEvent(evt: PageEvent) {
    this.appService.pageSize = evt.pageSize;
  }

}
