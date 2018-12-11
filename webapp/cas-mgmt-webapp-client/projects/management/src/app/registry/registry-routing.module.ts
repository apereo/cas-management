import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomainsComponent} from './domains/domains.component';
import {DomainsResolver} from './domains/domains.resolver';
import {ServicesComponent} from './services/services.component';
import {ServicesResolve} from './services/services.resolover';
import {SearchComponent} from './search/search.component';
import {JSONComponent} from './json/json.component';
import {JSONResolver} from './json/json.resolover';
import {YamlComponent} from './yaml/yaml.component';
import {YamlResolver} from './yaml/yaml.resolover';
import {ImportComponent} from './import/import.component';

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
    path: 'viewJson/:id',
    component: JSONComponent,
    resolve: {
      resp: JSONResolver
    },
    data: {
      history: true
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
    path: 'viewYaml/:id',
    component: YamlComponent,
    resolve: {
      resp: YamlResolver
    },
    data: {
      history: true
    }
  },
  {
    path: 'import',
    component: ImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
