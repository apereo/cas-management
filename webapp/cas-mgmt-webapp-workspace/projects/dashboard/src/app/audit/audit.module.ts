import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatDatepickerModule} from '@angular/material';
import {ProjectShareModule} from '../project-share/project-share.module';
import {AuditComponent} from './audit.component';
import {SearchComponent} from './search/search.component';
import {AuditRoutingModule} from './audit-routing.module';

@NgModule({
  declarations:
    [AuditComponent,
     SearchComponent
  ],
  entryComponents: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    MatCardModule,
    AuditRoutingModule,
    MatDatepickerModule
  ]
})
export class AuditModule { }
