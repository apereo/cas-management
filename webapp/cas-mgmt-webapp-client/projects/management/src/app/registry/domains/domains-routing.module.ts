import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomainsComponent} from '@app/registry/domains/domains.component';
import {DomainsResolver} from '@app/registry/domains/domains.resolver';

const routes: Routes = [
  {
    path: '',
    component: DomainsComponent,
    resolve: {
      resp: DomainsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainsRoutingModule { }
