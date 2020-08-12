import {NgModule} from '@angular/core';

import {VersionControlRoutingModule} from './version-control-routing.module';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [
  ],
  imports: [
    ProjectShareModule,
    VersionControlRoutingModule
  ]
})
export class VersionControlModule { }
