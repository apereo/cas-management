import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProjectShareModule} from './project-share/project-share.module';
import {CoreModule} from './core/core.module';

/**
 * Top level application module.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ProjectShareModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
