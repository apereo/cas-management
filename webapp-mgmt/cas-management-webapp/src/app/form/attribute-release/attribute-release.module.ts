import {FormRoutingModule} from '../form-routing.module';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ChecksComponent} from './checks/checks.component';
import {ConsentComponent} from './consent/consent.component';
import {FiltersComponent} from './filters/filters.component';
import {OidcOptionsComponent} from './oidc-options/oidc-options.component';
import {PoliciesComponent} from './policies/policies.component';
import {PrincipalRepoComponent} from './principal-repo/principal-repo.component';
import {WsfedOptionsComponent} from './wsfed-options/wsfed-options.component';
import {MappedComponent} from './filters/mapped/mapped.component';
import {AttributemappingModule} from '../attributemapping/attributemapping.module';
import {WsfedattrrelpoliciesModule} from '../wsfedattrrelpolocies/wsfedattrrelpolicies.module';
import {FormSharedModule} from '../form-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule,
    FormSharedModule,
    FormRoutingModule,
    AttributemappingModule,
    WsfedattrrelpoliciesModule
  ],
  declarations: [
    ChecksComponent,
    ConsentComponent,
    FiltersComponent,
    OidcOptionsComponent,
    PoliciesComponent,
    PrincipalRepoComponent,
    WsfedOptionsComponent,
    MappedComponent
  ],
  exports: [
    ChecksComponent,
    ConsentComponent,
    FiltersComponent,
    OidcOptionsComponent,
    PoliciesComponent,
    PrincipalRepoComponent,
    WsfedOptionsComponent,
    MappedComponent
  ]
})

export class AttributeReleaseModule {}
