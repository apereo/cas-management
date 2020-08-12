import {NgModule} from '@angular/core';

import {RegistryRoutingModule} from './registry-routing.module';
import {DeleteComponent} from './delete/delete.component';
import {ProjectShareModule} from '../project-share/project-share.module';

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
