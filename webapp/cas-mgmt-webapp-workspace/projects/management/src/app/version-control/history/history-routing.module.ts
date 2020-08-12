import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoryComponent} from './history.component';
import {HistoryResolve} from './history.resolover';

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
