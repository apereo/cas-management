import {NgModule} from '@angular/core';

import {MetadataRoutingModule} from './metadata-routing.module';
import {MetadataComponent} from './metadata.component';
import {ProjectShareModule} from '../../project-share/project-share.module';

@NgModule({
  declarations: [
    MetadataComponent
  ],
  imports: [
    ProjectShareModule,
    MetadataRoutingModule
  ]
})
export class MetadataModule { }
