import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubmitsComponent} from './submits.component';
import {SubmitsResolver} from './submits.resolver';

const routes: Routes = [
  {
    path: '',
    component: SubmitsComponent,
    resolve: {
      resp: SubmitsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitsRoutingModule { }
