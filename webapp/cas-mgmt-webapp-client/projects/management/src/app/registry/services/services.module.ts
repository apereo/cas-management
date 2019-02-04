import { NgModule } from '@angular/core';
import { ServicesRoutingModule } from './services-routing.module';
import {ServicesComponent} from '@app/registry/services/services.component';
import {ProjectShareModule} from '@app/project-share';

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
