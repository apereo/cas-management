import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import { SearchComponent } from './search/search.component';
import {MatCardModule} from '@angular/material';

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
    AuditRoutingModule,
    MatCardModule
  ]
})
export class AuditModule { }
