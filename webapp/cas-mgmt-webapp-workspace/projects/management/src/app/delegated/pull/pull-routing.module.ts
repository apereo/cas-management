import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PullComponent} from './pull.component';
import {PullResolver} from './pull.resolver';

const routes: Routes = [
  {
    path: '',
    component: PullComponent,
    resolve: {
      resp: PullResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PullRoutingModule { }
