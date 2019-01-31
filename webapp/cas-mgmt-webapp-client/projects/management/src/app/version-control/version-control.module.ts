import { NgModule } from '@angular/core';

import { VersionControlRoutingModule } from './version-control-routing.module';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
  ],
  imports: [
    ProjectShareModule,
    VersionControlRoutingModule
  ]
})
export class VersionControlModule { }
