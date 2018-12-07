import { NgModule } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {TimeoutComponent} from './timeout/timeout.component';
import {InitComponent} from './init.component';
import {RouterModule} from '@angular/router';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  imports: [
    ProjectShareModule,
    RouterModule,
  ],
  declarations: [
    NavigationComponent,
    TimeoutComponent,
    InitComponent,
  ],
  exports: [
    NavigationComponent,
    TimeoutComponent,
    InitComponent,
  ]
})
export class CoreModule { }
