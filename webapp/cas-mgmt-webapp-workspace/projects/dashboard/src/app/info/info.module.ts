import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import {ProjectShareModule} from '../project-share/project-share.module';

/**
 * Module to lazy-load info functionality.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    ProjectShareModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
