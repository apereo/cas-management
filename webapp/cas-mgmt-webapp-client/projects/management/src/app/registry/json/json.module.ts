import { NgModule } from '@angular/core';

import { JsonRoutingModule } from './json-routing.module';
import {ProjectShareModule} from '@app/project-share';
import {JSONComponent} from '@app/registry/json/json.component';

@NgModule({
  declarations: [
    JSONComponent
  ],
  imports: [
    ProjectShareModule,
    JsonRoutingModule
  ]
})
export class JsonModule { }
