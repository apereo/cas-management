import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingComponent} from './pending.component';
import {PendingResolve} from './pending.resolover';

const routes: Routes = [
  {
    path: '',
    component: PendingComponent,
    resolve: {
      resp: PendingResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRoutingModule { }
