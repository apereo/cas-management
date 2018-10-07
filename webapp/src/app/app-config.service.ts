import { Injectable } from '@angular/core';
import {AppConfig} from '../domain/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class AppConfigService {

  pageSize = 10;

  config: AppConfig = new AppConfig();

  constructor(private http: HttpClient) {
    this.getConfig().subscribe();
  }

  getConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('appConfig')
      .pipe(
        tap(resp => {
          this.config = resp
        })
      );
  }

}
