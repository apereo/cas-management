import { NgModule } from '@angular/core';

import { DelegatedRoutingModule } from './delegated-routing.module';
import {ProjectShareModule} from '../project-share/project-share.module';
import {AdminModule} from '../admin/admin.module';

@NgModule({
  imports: [
    ProjectShareModule,
    AdminModule,
    DelegatedRoutingModule
  ]
})
export class DelegatedModule { }
