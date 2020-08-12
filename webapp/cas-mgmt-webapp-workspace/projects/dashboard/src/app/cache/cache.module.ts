import {NgModule} from '@angular/core';

import {CacheRoutingModule} from './cache-routing.module';
import {ProjectShareModule} from '../project-share/project-share.module';
import {CacheComponent} from './cache.component';

@NgModule({
  declarations: [
    CacheComponent
  ],
  imports: [
    ProjectShareModule,
    CacheRoutingModule
  ]
})
export class CacheModule { }
