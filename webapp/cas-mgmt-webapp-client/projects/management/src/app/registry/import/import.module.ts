import { NgModule } from '@angular/core';
import { ImportRoutingModule } from './import-routing.module';
import {ProjectShareModule} from '@app/project-share';
import {ImportComponent} from '@app/registry/import/import.component';

@NgModule({
  declarations: [
    ImportComponent
  ],
  imports: [
    ProjectShareModule,
    ImportRoutingModule
  ]
})
export class ImportModule { }
