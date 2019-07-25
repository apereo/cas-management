import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResolveComponent} from './resolve.component';

const routes: Routes = [
  {
    path: '',
    component: ResolveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolveRoutingModule { }
