import { NgModule } from '@angular/core';

import { SearchRoutingModule } from './search-routing.module';
import {SearchComponent} from './search.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    ProjectShareModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
