import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DomainsComponent} from './domains/domains.component';
import {ImportComponent} from './import/import.component';
import {JSONComponent} from './json/json.component';
import {JSONResolver} from './json/json.resolover';
import {YamlComponent} from './yaml/yaml.component';
import {YamlResolver} from './yaml/yaml.resolover';
import {ServicesComponent} from './services/services.component';
import {ServicesResolve} from './services/services.resolover';
import {SearchComponent} from './search/search.component';
import {DomainsResolver} from './domains/domains.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'domains',
        component: DomainsComponent,
        resolve: {
          resp: DomainsResolver
        }
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
        path: 'services/:domain',
        component: ServicesComponent,
        resolve: {
          resp: ServicesResolve
        }
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'import',
        component: ImportComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]

})
export class RegistryRoutingModule{}
