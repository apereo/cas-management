import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResponseComponent} from './response.component';

const routes: Routes = [
  {
    path: '',
    component: ResponseComponent
  }
];

/**
 * Routing module for ResponseModule.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseRoutingModule { }
