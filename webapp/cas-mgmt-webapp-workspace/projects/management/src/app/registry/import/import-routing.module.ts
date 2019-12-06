import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ImportComponent} from './import.component';

const routes: Routes = [
  {
    path: '',
    component: ImportComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
