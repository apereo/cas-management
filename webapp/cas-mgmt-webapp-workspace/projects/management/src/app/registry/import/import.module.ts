import {NgModule} from '@angular/core';
import {ImportComponent} from './import.component';
import {ProjectShareModule} from '../../project-share/project-share.module';
import {ImportRoutingModule} from './import-routing.module';

@NgModule({
  declarations: [
    ImportComponent
  ],
  imports: [
    ProjectShareModule,
    ImportRoutingModule
  ]
})
export class ImportModule {}
