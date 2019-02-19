import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'history',
    loadChildren: './history/history.module#HistoryModule'
  },
  {
    path: 'localChanges',
    loadChildren: './local-changes/local-changes.module#LocalChangesModule'
  },
  {
    path: 'changes',
    loadChildren: './changes/changes.module#ChangesModule'
  },
  {
    path: 'repo-history',
    loadChildren: './repo-history/repo-history.module#RepoHistoryModule'
  },
  {
    path: 'commit-history',
    loadChildren: './commit-history/commit-history.module#CommitHistoryModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionControlRoutingModule { }
