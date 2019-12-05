import { NgModule } from '@angular/core';
import { YamlRoutingModule } from './yaml-routing.module';
import {YamlComponent} from './yaml.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
