import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RepoHistoryComponent} from '@app/version-control/repo-history/repo-history.component';
import {RepoHistoryResolver} from '@app/version-control/repo-history/repo-history.resolver';

const routes: Routes = [
  {
    path: '',
    component: RepoHistoryComponent,
    resolve: {
      resp: RepoHistoryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepoHistoryRoutingModule { }
