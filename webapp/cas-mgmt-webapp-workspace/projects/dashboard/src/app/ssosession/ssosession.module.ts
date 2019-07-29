import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsosessionRoutingModule } from './ssosession-routing.module';
import { SsosessionComponent } from './ssosession.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import { DetailComponent } from './detail/detail.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    SsosessionComponent,
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    SsosessionRoutingModule,
    MatDialogModule
  ]
})
export class SsosessionModule { }
