import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import {ServicesComponent} from './services.component';
import {ProjectShareModule} from '../project-share/project-share.module';

/**
 * Module to lazy-load services functionality for the application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
