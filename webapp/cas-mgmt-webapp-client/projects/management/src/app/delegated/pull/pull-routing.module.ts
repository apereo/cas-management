import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PullComponent} from '@app/delegated/pull/pull.component';
import {PullResolver} from '@app/delegated/pull/pull.resolver';

const routes: Routes = [
  {
    path: '',
    component: PullComponent,
    resolve: {
      resp: PullResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PullRoutingModule { }
