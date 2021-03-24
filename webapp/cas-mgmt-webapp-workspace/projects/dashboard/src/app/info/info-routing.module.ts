import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfoComponent} from './info.component';
import {InfoResolve} from './info.resolve';

const routes: Routes = [
  {
    path: '',
    component: InfoComponent,
    resolve: {
      resp: InfoResolve
    }
  }
];

/**
 * Routing module for InfoModule.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
