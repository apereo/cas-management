import { NgModule } from '@angular/core';

import { RegistryRoutingModule } from './registry-routing.module';
import {DeleteComponent} from './delete/delete.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    DeleteComponent,
  ],
  entryComponents: [
    DeleteComponent
  ],
  imports: [
    ProjectShareModule,
    RegistryRoutingModule
  ]
})
export class RegistryModule { }
