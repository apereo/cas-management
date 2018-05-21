import { Injectable } from '@angular/core';
import {AppConfig} from '../domain/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppConfigService {

  pageSize = 10;

  config: AppConfig = new AppConfig();

  constructor(private http: HttpClient) {
    this.getConfig().subscribe(resp => this.config = resp);
  }

  getConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('appConfig');
  }

}
