import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TokensComponent} from './tokens.component';

const routes: Routes = [
  {
    path: '',
    component: TokensComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokensRoutingModule { }
