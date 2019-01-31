import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HistoryComponent} from '@app/version-control/history/history.component';
import {HistoryResolve} from '@app/version-control/history/history.resolover';

const routes: Routes = [
  {
    path: ':fileName',
    component: HistoryComponent,
    resolve: {
      resp: HistoryResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
