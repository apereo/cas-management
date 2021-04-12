import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SsosessionsComponent} from './ssosessions.component';

const routes: Routes = [
  {
    path: '',
    component: SsosessionsComponent
  }
];

/**
 * Routing module for SsoSessionModule.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsosessionsRoutingModule { }
