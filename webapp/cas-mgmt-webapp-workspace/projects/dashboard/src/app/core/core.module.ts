import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

/**
 * Core module for dashboard application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    NavigationComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
