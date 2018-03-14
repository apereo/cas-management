import 'rxjs/add/operator/toPromise';
import 'hammerjs';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { RegisterModule } from './register/register.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(RegisterModule);

