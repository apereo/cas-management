import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SsosessionComponent} from './ssosession.component';
import {SsoSessionResolve} from './ssosession.resolve';

const routes: Routes = [
  {
    path: '',
    component: SsosessionComponent,
    resolve: {
      resp: SsoSessionResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsosessionRoutingModule { }
