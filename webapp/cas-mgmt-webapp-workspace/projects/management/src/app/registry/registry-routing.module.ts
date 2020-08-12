import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'domains',
    loadChildren: () => import('./domains/domains.module').then(m => m.DomainsModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'json',
    loadChildren: () => import('./json/json.module').then(m => m.JsonModule),
  },
  {
    path: 'yaml',
    loadChildren: () => import('./yaml/yaml.module').then(m => m.YamlModule)
  },
  {
    path: 'import',
    loadChildren: () => import('./import/import.module').then(m => m.ImportModule)
  },
  {
    path: 'metadata',
    loadChildren: () => import('./metadata/metadata.module').then(m => m.MetadataModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
