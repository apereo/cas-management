import { NgModule } from '@angular/core';
import { LocalChangesRoutingModule } from './local-changes-routing.module';
import {LocalChangesComponent} from './local-changes.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
