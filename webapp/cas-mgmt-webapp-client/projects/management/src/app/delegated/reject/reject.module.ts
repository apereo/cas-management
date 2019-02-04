import { NgModule } from '@angular/core';
import {ProjectShareModule} from '@app/project-share';
import {RejectComponent} from '@app/delegated/reject/reject.component';

@NgModule({
  declarations: [
    RejectComponent
  ],
  entryComponents: [
    RejectComponent
  ],
  imports: [
    ProjectShareModule
  ]
})
export class RejectModule { }
