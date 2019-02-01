import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChecksComponent} from './checks/checks.component';
import {ConsentComponent} from './consent/consent.component';
import {FiltersComponent} from './filters/filters.component';
import {OidcOptionsComponent} from './oidc-options/oidc-options.component';
import {PoliciesComponent} from './policies/policies.component';
import {PrincipalRepoComponent} from './principal-repo/principal-repo.component';
import {MappedComponent} from './policies/mapped/mapped.component';
import {WsfedattrrelpoliciesModule} from '../wsfedattrrelpolocies/wsfedattrrelpolicies.module';
import { ScriptComponent } from './policies/script/script.component';
import { GroovyComponent } from './policies/groovy/groovy.component';
import { AllowedComponent } from './policies/allowed/allowed.component';
import { MetadataComponent } from './policies/metadata/metadata.component';
import { RestfulComponent } from './policies/restful/restful.component';
import { GroovySamlComponent } from './policies/groovy-saml/groovy-saml.component';
import {FilterMappedComponent} from './filters/filter-mapped/filter-mapped.component';
import {SharedModule} from '../../shared/shared.module';
import {SamlLdapComponent} from './policies/saml-ldap/saml-ldap.component';
import {OauthComponent} from './policies/oauth/oauth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
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
    MappedComponent,
    ScriptComponent,
    GroovyComponent,
    AllowedComponent,
    MetadataComponent,
    RestfulComponent,
    GroovySamlComponent,
    SamlLdapComponent,
    OauthComponent
  ],
  exports: [
    ChecksComponent,
    ConsentComponent,
    FiltersComponent,
    OidcOptionsComponent,
    PoliciesComponent,
    PrincipalRepoComponent,
    MappedComponent,
    OauthComponent
  ]
})

export class AttributeReleaseModule {}
