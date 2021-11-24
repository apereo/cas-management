import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangesComponent} from './changes/changes.component';
import {CommitHistoryComponent} from './commit-history/commit-history.component';
import {HistoryComponent} from './history/history.component';
import {LocalChangesComponent} from './local-changes/local-changes.component';
import {RepoHistoryComponent} from './repo-history/repo-history.component';
import {ChangesResolve} from './changes/changes.resolver';
import {CommitHistoryResolve} from './commit-history/commit-history.resolver';
import {HistoryResolve} from './history/history.resolver';
import {LocalChangesResolver} from './local-changes/local-changes.resolver';
import {RepoHistoryResolver} from './repo-history/repo-history.resolver';

const routes: Routes = [
  {
    path: 'history/:filename',
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
  }
];

/**
 * Routing module for version control components.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionControlRoutingModule { }
