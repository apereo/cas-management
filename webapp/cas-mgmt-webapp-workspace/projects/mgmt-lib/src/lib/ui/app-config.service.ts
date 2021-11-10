import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, tap} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppConfig} from '@apereo/mgmt-lib/src/lib/model';
import {
  AbstractRegisteredService, OAuthRegisteredService,
  OidcRegisteredService, RegexRegisteredService,
  SamlRegisteredService,
  WSFederationRegisteredService,
  AppData
} from '@apereo/mgmt-lib/src/lib/model';
import {ViewComponent} from './view/view.component';
import {SpinnerService} from './spinner/spinner.service';
import {Service} from './service';

/**
 * Service that handles calls to the server to retrieve application config information.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends Service {

  pageSize = 10;

  config: AppConfig = new AppConfig();

  options: AppData;

  constructor(public http: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              protected spinner: SpinnerService) {
    super(http, dialog, spinner);
    this.getConfig().subscribe();
    this.formData().subscribe(o => this.options = o);
  }

  /**
   * Calls the server and returns the AppConfig.
   */
  getConfig(): Observable<AppConfig> {
    return this.get<AppConfig>('api/appConfig')
      .pipe(
        tap(resp => {
          this.config = resp;
        })
      );
  }

  /**
   * Calls the server to return a generated random string.
   */
  getRandom(): Observable<string> {
    return this.getText('api/generateRandom');
  }

  /**
   * Shows default snackbar with the passed message.
   *
   *  @param message - message to display
   */
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {duration: 5000});
  }

  /**
   * Returns true if the service is an instance of OidcRegisteredService.
   */
  isOidc(service: AbstractRegisteredService): boolean {
    return OidcRegisteredService.instanceOf(service);
  }

  /**
   * Returns true if the service is an instance of SamlRegisteredService.
   */
  isSaml(service: AbstractRegisteredService): boolean {
    return SamlRegisteredService.instanceOf(service);
  }

  /**
   * Returns true if the service is an instance of WsFedereationRegisteredService.
   */
  isWsFed(service: AbstractRegisteredService): boolean {
    return WSFederationRegisteredService.instanceOf(service);
  }

  /**
   * Returns true if the service is an instance of OAuthRegisteredService.
   */
  isOauth(service: AbstractRegisteredService): boolean {
    return OAuthRegisteredService.instanceOf(service);
  }

  /**
   * Returns true if the service is an instance of RegexRegisteredService.
   */
  isCas(service: AbstractRegisteredService): boolean {
    return RegexRegisteredService.instanceOf(service);
  }

  /**
   * Opens the ViewComponent in a dialog displaying the passed text.
   *
   * @param text - text to display.
   * @param mode - editor mode
   * @param theme - editor theme
   */
  openView(text: string, mode: string, theme?: string) {
    this.dialog.open(ViewComponent, {
      data: [text, mode, theme],
      width: '900px',
      position: {top: '50px'},
    });
  }

  /**
   * Calls server to get the form data.
   */
  private formData(): Observable<AppData> {
    return this.get<AppData>('api/formData')
      .pipe(
        catchError(e => this.handleError(e, this.dialog))
      );
  }

}
