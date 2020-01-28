import { NgModule } from '@angular/core';

import { SubmitsRoutingModule } from './submits-routing.module';
import {SubmitsComponent} from './submits.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

@NgModule({
  declarations: [
    SubmitsComponent
  ],
  imports: [
    ProjectShareModule,
    SubmitsRoutingModule
  ]
})
export class SubmitsModule { }
