import {NgModule} from '@angular/core';

import {DelegatedRoutingModule} from './delegated-routing.module';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  imports: [
    ProjectShareModule,
    DelegatedRoutingModule
  ]
})
export class DelegatedModule { }
