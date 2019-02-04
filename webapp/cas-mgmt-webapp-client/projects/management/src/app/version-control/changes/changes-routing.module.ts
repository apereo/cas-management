import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangesComponent} from '@app/version-control/changes/changes.component';
import {ChangesResolve} from '@app/version-control/changes/changes.resolover';

const routes: Routes = [
  {
    path: ':branch',
    component: ChangesComponent,
    resolve: {
      resp: ChangesResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangesRoutingModule { }
