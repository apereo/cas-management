import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YamlComponent} from '@app/registry/yaml/yaml.component';
import {YamlResolver} from '@app/registry/yaml/yaml.resolover';

const routes: Routes = [
  {
    path: ':id',
    component: YamlComponent,
    resolve: {
      resp: YamlResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YamlRoutingModule { }
