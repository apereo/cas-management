import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseRoutingModule } from './release-routing.module';
import { ReleaseComponent } from './release.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ReleaseComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    ReleaseRoutingModule,
    MatDialogModule,
  ]
})
export class ReleaseModule { }
