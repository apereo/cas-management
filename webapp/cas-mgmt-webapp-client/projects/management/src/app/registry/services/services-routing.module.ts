import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicesComponent} from '@app/registry/services/services.component';
import {ServicesResolve} from '@app/registry/services/services.resolover';

const routes: Routes = [
  {
    path: ':domain',
    component: ServicesComponent,
    resolve: {
      resp: ServicesResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
