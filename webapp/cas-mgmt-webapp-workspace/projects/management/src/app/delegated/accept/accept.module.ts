import { NgModule } from '@angular/core';

import {ProjectShareModule} from '@app/project-share';
import {AcceptComponent} from '@app/delegated/accept/accept.component';

@NgModule({
  declarations: [
    AcceptComponent
  ],
  entryComponents: [
    AcceptComponent
  ],
  imports: [
    ProjectShareModule
  ]
})
export class AcceptModule { }
