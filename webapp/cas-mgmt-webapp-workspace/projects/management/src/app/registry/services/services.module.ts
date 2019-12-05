import { NgModule } from '@angular/core';

import { ServicesRoutingModule } from './services-routing.module';
import {ServicesComponent} from './services.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

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
