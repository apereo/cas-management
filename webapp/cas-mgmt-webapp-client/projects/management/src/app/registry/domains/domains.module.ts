import { NgModule } from '@angular/core';
import { DomainsRoutingModule } from './domains-routing.module';
import {DomainsComponent} from '@app/registry/domains/domains.component';
import {ProjectShareModule} from '@app/project-share';

@NgModule({
  declarations: [
    DomainsComponent
  ],
  imports: [
    ProjectShareModule,
    DomainsRoutingModule
  ]
})
export class DomainsModule { }
