import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SubmissionsComponent} from './submissions.component';
import {SubmissionsResolve} from './submissions.resolover';

const routes: Routes = [
  {
    path: '',
    component: SubmissionsComponent,
    resolve: {
      resp: SubmissionsResolve
    }
  }
];

/**
 * Routing module for SubmissionsModule.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionsRoutingModule {}
