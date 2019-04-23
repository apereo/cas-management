import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SsosessionsComponent} from './ssosessions.component';
import {SsoSessionsResolve} from './ssosessions.resolver';

const routes: Routes = [
  {
    path: '',
    component: SsosessionsComponent,
    resolve: {
      resp: SsoSessionsResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsosessionsRoutingModule { }
