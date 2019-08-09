import { NgModule } from '@angular/core';

import { ServicesRoutingModule } from './services-routing.module';
import {ProjectShareModule} from '@app/project-share';
import {ServicesComponent} from '@app/registry/services/services.component';

@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    ProjectShareModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
