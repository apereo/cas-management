import { NgModule } from '@angular/core';
import {AcceptComponent} from './accept/accept.component';
import {RejectComponent} from './reject/reject.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [
    AcceptComponent,
    RejectComponent
  ],
  entryComponents: [
    AcceptComponent,
    RejectComponent
  ],
  imports: [
    ProjectShareModule
  ],
  exports: [
    AcceptComponent,
    RejectComponent
  ]
})
export class AdminModule { }
