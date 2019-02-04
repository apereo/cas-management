import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommitHistoryComponent} from '@app/version-control/commit-history/commit-history.component';
import {CommitHistoryResolve} from '@app/version-control/commit-history/commit-history.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: CommitHistoryComponent,
    resolve: {
      resp: CommitHistoryResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitHistoryRoutingModule { }
