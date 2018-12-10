import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HistoryComponent} from './history/history.component';
import {HistoryResolve} from './history/history.resolover';
import {LocalChangesComponent} from './local-changes/local-changes.component';
import {LocalChangesResolver} from './local-changes/local-changes.resolver';
import {ChangesComponent} from './changes/changes.component';
import {ChangesResolve} from './changes/changes.resolover';
import {RepoHistoryComponent} from './repo-history/repo-history.component';
import {RepoHistoryResolver} from './repo-history/repo-history.resolver';
import {CommitHistoryComponent} from './commit-history/commit-history.component';
import {CommitHistoryResolve} from './commit-history/commit-history.resolver';

const routes: Routes = [
  {
    path: 'history/:fileName',
    component: HistoryComponent,
    resolve: {
      resp: HistoryResolve
    }
  },
  {
    path: 'localChanges',
    component: LocalChangesComponent,
    resolve: {
      resp: LocalChangesResolver
    }
  },
  {
    path: 'changes/:branch',
    component: ChangesComponent,
    resolve: {
      resp: ChangesResolve
    }
  },
  {
    path: 'repo-history',
    component: RepoHistoryComponent,
    resolve: {
      resp: RepoHistoryResolver
    }
  },
  {
    path: 'commit-history/:id',
    component: CommitHistoryComponent,
    resolve: {
      resp: CommitHistoryResolve
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionControlRoutingModule { }
