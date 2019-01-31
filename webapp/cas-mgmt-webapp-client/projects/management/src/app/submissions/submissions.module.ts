/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import {SubmissionsComponent} from './submissions.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {SubmissionsRoutingModule} from './submissions-routing.module';
import {AdminModule} from '../admin/admin.module';

@NgModule({
  imports: [
    ProjectShareModule,
    AdminModule,
    SubmissionsRoutingModule
  ],
  declarations: [
    SubmissionsComponent
  ]
})

export class SubmissionsModule {}

