import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {InitComponent} from './init.component';
import {MgmtLibModule} from 'mgmt-lib';

@NgModule({
  declarations: [
    NavigationComponent,
    InitComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    MgmtLibModule
  ],
  exports: [
    NavigationComponent,
    InitComponent
  ]
})
export class CoreModule { }
