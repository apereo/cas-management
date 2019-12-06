import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DomainsComponent} from './domains.component';
import {DomainsResolver} from './domains.resolver';

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
