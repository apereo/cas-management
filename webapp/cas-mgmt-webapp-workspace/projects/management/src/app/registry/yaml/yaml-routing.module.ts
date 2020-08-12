import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YamlComponent} from './yaml.component';
import {YamlResolver} from './yaml.resolover';

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
