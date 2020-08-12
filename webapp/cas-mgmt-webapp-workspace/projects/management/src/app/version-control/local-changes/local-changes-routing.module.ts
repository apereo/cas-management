import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocalChangesResolver} from './local-changes.resolver';
import {LocalChangesComponent} from './local-changes.component';

const routes: Routes = [
  {
    path: '',
    component: LocalChangesComponent,
    resolve: {
      resp: LocalChangesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalChangesRoutingModule { }
