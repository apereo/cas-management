import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSlideToggleChange, MatTableDataSource} from '@angular/material';
import {Cache, MapDetails} from '../domain/cache';
import {DashboardService} from '../core/dashboard-service';
import {ActivatedRoute} from '@angular/router';
import {PaginatorComponent} from 'shared-lib';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.css']
})
export class CacheComponent implements OnInit {

  cache: Cache;
  cacheTimer;

  dataSource: MatTableDataSource<MapDetails>;
  displayedColumns = [ 'name', 'size', 'memory', 'used' ];

  @ViewChild(PaginatorComponent, {static: true})
  pagintor: PaginatorComponent;

  constructor(private service: DashboardService,
              private route: ActivatedRoute) {
    this.cache = new Cache();
  }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Cache}) => {
      const d = Object.keys(data.resp.details.maps).map(k => {
        const m = data.resp.details.maps[k];
        m.name = k;
        return m;
      });
      this.dataSource = new MatTableDataSource<MapDetails>(d);
      this.dataSource.paginator = this.pagintor.paginator;
    });
  }

  update(event: MatSlideToggleChange) {
    if (event.checked) {
      this.cacheTimer = () => {
        this.service.getCache().subscribe(cache => {
          this.dataSource.data = Object.keys(cache.details.maps).map(k => {
            const m = cache.details.maps[k];
            m.name = k;
            return m;
          });
          if (this.cacheTimer) {
            setTimeout(this.cacheTimer, 1000);
          }
        });
      };
      setTimeout(this.cacheTimer, 1000);
    } else {
      this.cacheTimer = null;
    }
  }

}
