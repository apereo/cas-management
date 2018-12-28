import { NgModule } from '@angular/core';

import { LookupRoutingModule } from './lookup-routing.module';
import {LookupComponent} from './lookup.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [
    LookupComponent
  ],
  imports: [
    ProjectShareModule,
    LookupRoutingModule
  ]
})
export class LookupModule { }
