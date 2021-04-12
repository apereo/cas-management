import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetermineRoute} from './determine-route';
import {ServicesComponent} from './services/services.component';
import {ServicesResolve} from './services/services.resolver';
import {SearchComponent} from './search/search.component';
import {DomainsComponent} from './domains/domains.component';
import {DomainsResolver} from './domains/domains.resolver';
import {OauthComponent} from './oauth/oauth.component';
import {OauthResolve} from './oauth/oauth.resolver';
import {SamlComponent} from './saml/saml.component';
import {SamlResolve} from './saml/saml.resolver';
import {ImportComponent} from './import/import.component';
import {MetadataEditorComponent} from './metadata/metadata.component';
import {MetadataResolver} from './metadata/metadata.resolver';
import {JSONComponent} from './json/json.component';
import {JSONResolver} from './json/json.resolver';
import {YamlComponent} from './yaml/yaml.component';
import {YamlResolver} from './yaml/yaml.resolver';

const routes: Routes = [
  {
    path: 'domains',
    component: DomainsComponent,
    resolve: {
      resp: DomainsResolver
    }
  },
  {
    path: 'services/:domain',
    component: ServicesComponent,
    resolve: {
      resp: ServicesResolve
    }

  },
  {
    path: 'oauth',
    component: OauthComponent,
    resolve: {
      resp: OauthResolve
    }
  },
  {
    path: 'saml',
    component: SamlComponent,
    resolve: {
      resp: SamlResolve
    }
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'json/:id',
    component: JSONComponent,
    resolve: {
      resp: JSONResolver
    }
  },
  {
    path: 'yaml/:id',
    component: YamlComponent,
    resolve: {
      resp: YamlResolver
    }
  },
  {
    path: 'import',
    component: ImportComponent,
  },
  {
    path: 'metadata/:id',
    component: MetadataEditorComponent,
    resolve: {
      resp: MetadataResolver
    }
  },
  {
    path: '',
    canActivate: [ DetermineRoute ]
  }
];

/**
 * Routing module for registry components.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
