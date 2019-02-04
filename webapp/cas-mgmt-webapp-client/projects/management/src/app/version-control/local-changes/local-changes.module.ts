import { NgModule } from '@angular/core';

import { LocalChangesRoutingModule } from './local-changes-routing.module';
import {LocalChangesComponent} from '@app/version-control/local-changes/local-changes.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    LocalChangesComponent
  ],
  imports: [
    ProjectShareModule,
    LocalChangesRoutingModule
  ]
})
export class LocalChangesModule { }
