import { NgModule } from '@angular/core';
import {ProjectShareModule} from '../project-share/project-share.module';
import {NavigationComponent} from './navigation/navigation.component';
import {InitComponent} from './init.component';

@NgModule({
  declarations: [
    NavigationComponent,
    InitComponent
  ],
  imports: [
    ProjectShareModule
  ],
  exports: [
    NavigationComponent,
    InitComponent
  ]
})
export class CoreModule { }
