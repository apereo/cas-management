import 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/src-min-noconflict/keybinding-vim';
import 'ace-builds/src-min-noconflict/mode-diff';
import 'ace-builds/src-min-noconflict/mode-text';
import 'ace-builds/src-min-noconflict/mode-json';
import 'ace-builds/src-min-noconflict/mode-yaml';
import 'ace-builds/src-min-noconflict/mode-hjson';
import 'ace-builds/src-min-noconflict/theme-github';
import 'ace-builds/src-min-noconflict/theme-eclipse';
import 'ace-builds/src-min-noconflict/theme-dreamweaver';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
