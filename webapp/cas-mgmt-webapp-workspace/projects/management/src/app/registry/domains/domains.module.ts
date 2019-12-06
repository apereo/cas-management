import {NgModule} from '@angular/core';
import {DomainsComponent} from './domains.component';
import {ProjectShareModule} from '../../project-share/project-share.module';
import {DomainsRoutingModule} from './domains-routing.module';

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
