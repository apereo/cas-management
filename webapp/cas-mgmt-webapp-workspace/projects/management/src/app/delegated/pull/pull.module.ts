import {NgModule} from '@angular/core';

import {PullRoutingModule} from './pull-routing.module';
import {PullComponent} from './pull.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

@NgModule({
  declarations: [
    PullComponent
  ],
  imports: [
    ProjectShareModule,
    PullRoutingModule
  ]
})
export class PullModule { }
