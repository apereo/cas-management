import { NgModule } from '@angular/core';

import { SubmitsRoutingModule } from './submits-routing.module';
import {SubmitsComponent} from '@app/delegated/submits/submits.component';
import {ProjectShareModule} from '@app/project-share';

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
