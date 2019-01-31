import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocalChangesComponent} from '@app/version-control/local-changes/local-changes.component';
import {LocalChangesResolver} from '@app/version-control/local-changes/local-changes.resolver';

const routes: Routes = [
  {
    path: 'localChanges',
    component: LocalChangesComponent,
    resolve: {
      resp: LocalChangesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalChangesRoutingModule { }
