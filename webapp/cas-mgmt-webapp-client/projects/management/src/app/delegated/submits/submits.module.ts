import { NgModule } from '@angular/core';
import { SubmitsRoutingModule } from './submits-routing.module';
import {ProjectShareModule} from '@app/project-share';
import {SubmitsComponent} from '@app/delegated/submits/submits.component';

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
