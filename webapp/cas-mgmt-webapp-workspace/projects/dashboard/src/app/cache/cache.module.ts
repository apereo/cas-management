import { NgModule } from '@angular/core';

import { CacheRoutingModule } from './cache-routing.module';
import {ProjectShareModule} from '../project-share/project-share.module';
import {CacheComponent} from './cache.component';

/**
 * Module to lazy-load cache display functionality.
 *
 * @author Travis Schmidt
 */
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
