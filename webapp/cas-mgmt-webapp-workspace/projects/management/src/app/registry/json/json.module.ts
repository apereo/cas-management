import { NgModule } from '@angular/core';

import { JsonRoutingModule } from './json-routing.module';
import {JSONComponent} from './json.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
