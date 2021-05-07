import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseRoutingModule } from './response-routing.module';
import { ResponseComponent } from './response.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

/**
 * Module to lazy-load saml response functionality.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    ResponseComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    ResponseRoutingModule,
    MatDialogModule,
  ]
})
export class ResponseModule { }
