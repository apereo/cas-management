import { NgModule } from '@angular/core';
import {ProjectShareModule} from '../project-share/project-share.module';
import {InitComponent} from './init.component';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation-register/navigation.component'

/**
 * Module to looad core components for the application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    NavigationComponent,
    InitComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule
  ],
  exports: [
    NavigationComponent,
    InitComponent
  ]
})
export class CoreModule { }
