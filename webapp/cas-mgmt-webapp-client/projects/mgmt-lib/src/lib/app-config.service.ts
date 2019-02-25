import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {AppConfig} from './domain/app-config';
import {Service} from './service';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends Service {

  pageSize = 10;

  config: AppConfig = new AppConfig();

  constructor(public http: HttpClient, public dialog: MatDialog) {
    super(http, dialog);
    this.getConfig().subscribe();
  }

  getConfig(): Observable<AppConfig> {
    return this.get<AppConfig>('api/appConfig')
      .pipe(
        tap(resp => {
          this.config = resp;
        })
      );
  }

}
