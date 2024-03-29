import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {ProjectShareModule} from './project-share/project-share.module';
import {CoreModule} from './core/core.module';

/**
 * Main module for the application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProjectShareModule,
    RouterModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
