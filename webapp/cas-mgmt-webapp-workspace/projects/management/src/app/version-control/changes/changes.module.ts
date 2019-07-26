import { NgModule } from '@angular/core';
import { ChangesRoutingModule } from './changes-routing.module';
import {ChangesComponent} from '@app/version-control/changes/changes.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    ChangesComponent
  ],
  imports: [
    ProjectShareModule,
    ChangesRoutingModule
  ]
})
export class ChangesModule { }
