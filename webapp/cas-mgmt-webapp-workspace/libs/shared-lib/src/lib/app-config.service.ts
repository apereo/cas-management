import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {AppConfig} from 'domain-lib';
import {Service} from './service';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends Service {

  pageSize = 10;

  config: AppConfig = new AppConfig();

  constructor(public http: HttpClient, public dialog: MatDialog, protected spinner: SpinnerService) {
    super(http, dialog, spinner);
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

  getRandom(): Observable<string> {
    return this.getText('api/generateRandom');
  }

}
