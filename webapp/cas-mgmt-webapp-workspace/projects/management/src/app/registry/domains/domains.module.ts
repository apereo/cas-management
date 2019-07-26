import {NgModule} from '@angular/core';
import {DomainsComponent} from '@app/registry/domains/domains.component';
import {ProjectShareModule} from '@app/project-share';
import {DomainsRoutingModule} from '@app/registry/domains/domains-routing.module';

@NgModule({
  declarations: [
    DomainsComponent
  ],
  imports: [
    ProjectShareModule,
    DomainsRoutingModule
  ]
})
export class DomainsModule {}
