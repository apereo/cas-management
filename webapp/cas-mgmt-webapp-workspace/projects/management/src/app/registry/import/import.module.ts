import {NgModule} from '@angular/core';
import {ProjectShareModule} from '@app/project-share';
import {ImportComponent} from '@app/registry/import/import.component';
import {ImportRoutingModule} from '@app/registry/import/import-routing.module';

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
