import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportComponent} from '@app/registry/import/import.component';

const routes: Routes = [
  {
    path: '',
    component: ImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
