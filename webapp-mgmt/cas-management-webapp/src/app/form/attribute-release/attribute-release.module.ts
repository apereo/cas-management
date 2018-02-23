import {FormRoutingModule} from '../form-routing.module';
import {CommonModule} from '@angular/common';
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
import {MappedComponent} from './policies/mapped/mapped.component';
import {AttributemappingModule} from '../attributemapping/attributemapping.module';
import {WsfedattrrelpoliciesModule} from '../wsfedattrrelpolocies/wsfedattrrelpolicies.module';
import {FormSharedModule} from '../form-shared.module';
import { ScriptComponent } from './policies/script/script.component';
import { GroovyComponent } from './policies/groovy/groovy.component';
import { AllowedComponent } from './policies/allowed/allowed.component';
import { MetadataComponent } from './policies/metadata/metadata.component';
import { RestfulComponent } from './policies/restful/restful.component';
import { GroovySamlComponent } from './policies/groovy-saml/groovy-saml.component';
import {FilterMappedComponent} from './filters/filter-mapped/filter-mapped.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    FilterMappedComponent,
    OidcOptionsComponent,
    PoliciesComponent,
    PrincipalRepoComponent,
    WsfedOptionsComponent,
    MappedComponent,
    ScriptComponent,
    GroovyComponent,
    AllowedComponent,
    MetadataComponent,
    RestfulComponent,
    GroovySamlComponent
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
