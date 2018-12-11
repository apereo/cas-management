import { NgModule } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {InitComponent} from './init.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavigationComponent,
    InitComponent
  ],
  imports: [
    ProjectShareModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    InitComponent
  ]
})
export class CoreModule { }
