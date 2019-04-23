import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {ProjectShareModule} from './project-share/project-share.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SsodetailComponent } from './ssodetail/ssodetail.component';

@NgModule({
  declarations: [
    AppComponent,
    SsodetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    LayoutModule,
    CoreModule,
    ProjectShareModule,
    AppRoutingModule
  ],
  entryComponents: [
    SsodetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
