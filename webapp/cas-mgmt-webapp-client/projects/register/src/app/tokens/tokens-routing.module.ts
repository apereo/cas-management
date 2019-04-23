import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TokensComponent} from './tokens.component';
import {TokensResolve} from './tokens.resolve';

const routes: Routes = [
  {
    path: '',
    component: TokensComponent,
    resolve: {
      resp: TokensResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokensRoutingModule { }
