import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'domains',
    loadChildren: './domains/domains.module#DomainsModule'
  },
  {
    path: 'services',
    loadChildren: './services/services.module#ServicesModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'json',
    loadChildren: './json/json.module#JsonModule',
  },
  {
    path: 'yaml',
    loadChildren: './yaml/yaml.module#YamlModule'
  },
  {
    path: 'import',
    loadChildren: './import/import.module#ImportModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
