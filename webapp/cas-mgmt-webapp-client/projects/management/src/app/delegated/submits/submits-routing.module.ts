import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubmitsComponent} from '@app/delegated/submits/submits.component';
import {SubmitsResolver} from '@app/delegated/submits/submits.resolver';

const routes: Routes = [
  {
    path: '',
    component: SubmitsComponent,
    resolve: {
      resp: SubmitsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitsRoutingModule { }
