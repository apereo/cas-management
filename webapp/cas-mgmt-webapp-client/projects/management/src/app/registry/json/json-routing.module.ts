import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JSONComponent} from '@app/registry/json/json.component';
import {JSONResolver} from '@app/registry/json/json.resolover';

const routes: Routes = [
  {
    path: ':id',
    component: JSONComponent,
    resolve: {
      resp: JSONResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonRoutingModule { }
