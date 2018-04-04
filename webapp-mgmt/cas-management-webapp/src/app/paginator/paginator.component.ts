import {Component, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from '../app-config.service';
import {MatPaginator, PageEvent} from '@angular/material';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator

  constructor(public appService: AppConfigService) {

  }

  ngOnInit() {
  }

  pageEvent(evt: PageEvent) {
    this.appService.pageSize = evt.pageSize;
  }

}
