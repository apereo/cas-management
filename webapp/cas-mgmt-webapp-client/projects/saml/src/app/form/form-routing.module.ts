import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from './form.component';
import {SamlFormResolve} from './form.resolve';

const routes: Routes = [
  {
    path: ':id',
    component: FormComponent,
    resolve: {
      resp: SamlFormResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
