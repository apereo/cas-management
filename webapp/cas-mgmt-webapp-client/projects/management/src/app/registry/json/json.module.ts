import { NgModule } from '@angular/core';
import { JsonRoutingModule } from './json-routing.module';
import {JSONComponent} from '@app/registry/json/json.component';
import {ProjectShareModule} from '@app/project-share';

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
