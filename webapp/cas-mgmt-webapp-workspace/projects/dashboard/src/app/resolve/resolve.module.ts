import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResolveRoutingModule } from './resolve-routing.module';
import { ResolveComponent } from './resolve.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [ResolveComponent],
  imports: [
    CommonModule,
    ProjectShareModule,
    ResolveRoutingModule,
  ]
})
export class ResolveModule { }
