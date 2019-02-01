import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OauthComponent} from './oauth/oauth.component';
import {OAuthFormResolve} from './form.resolve';

const routes: Routes = [
  {
    path: 'oauth/:id',
    component: OauthComponent,
    resolve: {
      resp: OAuthFormResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
