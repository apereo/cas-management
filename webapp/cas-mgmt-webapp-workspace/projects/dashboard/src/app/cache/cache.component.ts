import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import {Cache, MapDetails} from '../domain/cache.model';
import {DashboardService} from '../core/dashboard-service';
import {ActivatedRoute} from '@angular/router';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';

/**
 * Component to inspect cache status for CAS servers.
 *
 * @author Travis Schmidt
 */
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
              private controls: ControlsService,
              private route: ActivatedRoute) {
    this.cache = new Cache();
  }

  /**
   * Extracts results from resolver and loads the table.
   */
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
    this.controls.resetButtons();
    this.controls.title = 'Cache';
    this.controls.icon = 'list';
  }

  /**
   * Sets a recurring timer to fetch results every 1 second.
   *
   * @param event - toggle change event
   */
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
