import { NgModule } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {TimeoutComponent} from './timeout/timeout.component';
import {InitComponent} from './init.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavigationComponent,
    TimeoutComponent,
    InitComponent
  ],
  imports: [
    ProjectShareModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    TimeoutComponent,
    InitComponent
  ]
})
export class CoreModule { }
