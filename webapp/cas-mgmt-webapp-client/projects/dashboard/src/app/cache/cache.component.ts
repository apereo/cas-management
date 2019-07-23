import { Component, OnInit } from '@angular/core';
import {MatSlideToggleChange} from '@angular/material';
import {Cache, MapDetails} from '../domain/cache';
import {DashboardService} from '../core/dashboard-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.css']
})
export class CacheComponent implements OnInit {

  cache: Cache;
  cacheTimer: Function;

  constructor(private service: DashboardService,
              private route: ActivatedRoute) {
    this.cache = new Cache();
  }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Cache}) => {
      this.cache = data.resp;
    })
  }

  update(event: MatSlideToggleChange) {
    if (event.checked) {
      this.cacheTimer = () => {
        this.service.getCache().subscribe(cache => {
          this.cache = cache;
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

  mapMemory(key: string): string {
    if (this.cache) {
      return this.mapDetails(key).memory.toFixed(0);
    }
    return '';
  }

  mapSize(key: string): string {
    if (this.cache) {
      return this.mapDetails(key).size.toFixed(0);
    }
    return '';
  }

  mapUsed(key: string): string {
    if (this.cache) {
      return ((this.mapDetails(key).memory / this.mapDetails(key).capacity) * 100.0).toFixed(4);
    }
    return '';
  }

  mapDetails(key: string): MapDetails {
    return this.cache.details.maps[key] as MapDetails;
  }

  mapKeys(): string[] {
    return Object.keys(this.cache.details.maps);
  }

}
