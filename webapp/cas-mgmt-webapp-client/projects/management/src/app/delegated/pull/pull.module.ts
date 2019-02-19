import { NgModule } from '@angular/core';

import { PullRoutingModule } from './pull-routing.module';
import {ProjectShareModule} from '@app/project-share';
import {PullComponent} from '@app/delegated/pull/pull.component';

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
