import { NgModule } from '@angular/core';

import { DelegatedRoutingModule } from './delegated-routing.module';
import {ProjectShareModule} from '../project-share/project-share.module';
import {AcceptModule} from '@app/delegated/accept/accept.module';
import {RejectModule} from '@app/delegated/reject/reject.module';

@NgModule({
  imports: [
    ProjectShareModule,
    AcceptModule,
    RejectModule,
    DelegatedRoutingModule
  ]
})
export class DelegatedModule { }
