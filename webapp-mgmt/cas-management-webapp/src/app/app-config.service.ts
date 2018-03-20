import { Injectable } from '@angular/core';
import {AppConfig} from '../domain/app-config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfigService {

  pageSize: number = 10;

  config: AppConfig = new AppConfig();

  constructor(private http: HttpClient) {
    this.getConfig();
  }

  getConfig(): Promise<AppConfig> {
    return this.http.get<AppConfig>('appConfig')
      .toPromise()
      .then(resp => {
        this.config = resp
        return resp;
      });
  }

}
