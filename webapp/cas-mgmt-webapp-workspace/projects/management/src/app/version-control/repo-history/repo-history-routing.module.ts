import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepoHistoryComponent} from './repo-history.component';
import {RepoHistoryResolver} from './repo-history.resolver';

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
