import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LookupComponent} from './lookup.component';

const routes: Routes = [
  {
    path: '',
    component: LookupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
