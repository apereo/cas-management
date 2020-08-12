import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'localChanges',
    loadChildren: () => import('./local-changes/local-changes.module').then(m => m.LocalChangesModule)
  },
  {
    path: 'changes',
    loadChildren: () => import('./changes/changes.module').then(m => m.ChangesModule)
  },
  {
    path: 'repo-history',
    loadChildren: () => import('./repo-history/repo-history.module').then(m => m.RepoHistoryModule)
  },
  {
    path: 'commit-history',
    loadChildren: () => import('./commit-history/commit-history.module').then(m => m.CommitHistoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionControlRoutingModule { }
