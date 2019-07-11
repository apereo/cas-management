import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YamlRoutingModule } from './yaml-routing.module';
import {YamlComponent} from '@app/registry/yaml/yaml.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    YamlComponent
  ],
  imports: [
    ProjectShareModule,
    YamlRoutingModule
  ]
})
export class YamlModule { }
