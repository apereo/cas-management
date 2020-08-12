import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {MgmtLibModule} from 'mgmt-lib';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    NavigationComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    MgmtLibModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
