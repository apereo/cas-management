import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import {SearchComponent} from '@app/registry/search/search.component';
import {ProjectShareModule} from '@app/project-share';

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
