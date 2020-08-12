import {NgModule} from '@angular/core';
import {ChangesRoutingModule} from './changes-routing.module';
import {ChangesComponent} from './changes.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

@NgModule({
  declarations: [
    ChangesComponent
  ],
  imports: [
    ProjectShareModule,
    ChangesRoutingModule
  ]
})
export class ChangesModule { }
