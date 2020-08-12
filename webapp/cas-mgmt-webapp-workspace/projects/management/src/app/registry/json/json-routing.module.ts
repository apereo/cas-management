import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JSONComponent} from './json.component';
import {JSONResolver} from './json.resolover';

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
