import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicesComponent} from './services.component';
import {ServicesResolve} from './services.resolover';

const routes: Routes = [
  {
    path: ':domain',
    component: ServicesComponent,
    resolve: {
      resp: ServicesResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
