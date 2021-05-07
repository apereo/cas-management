import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResolveRoutingModule } from './resolve-routing.module';
import { ResolveComponent } from './resolve.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {DialogComponent} from './dialog/dialog.component';

/**
 * Module to lazy-load resolve attributes functionality.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
    ResolveComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    ResolveRoutingModule,
  ]
})
export class ResolveModule { }
