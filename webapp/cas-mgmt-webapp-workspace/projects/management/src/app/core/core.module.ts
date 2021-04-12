import { NgModule } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {RouterModule} from '@angular/router';

/**
 * Core module for the management application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    ProjectShareModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
