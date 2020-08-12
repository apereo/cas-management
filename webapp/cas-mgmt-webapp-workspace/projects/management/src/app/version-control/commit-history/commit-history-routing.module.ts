import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommitHistoryComponent} from './commit-history.component';
import {CommitHistoryResolve} from './commit-history.resolver';

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
