import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OauthComponent} from './oauth/oauth.component';
import {OAuthFormResolve} from './form.resolve';
import {OidcComponent} from './oidc/oidc.component';
import {OidcFormResolve} from './oidc.resolve';

const routes: Routes = [
  {
    path: 'oauth/:id',
    component: OauthComponent,
    resolve: {
      resp: OAuthFormResolve
    }
  },
  {
    path: 'oidc/:id',
    component: OidcComponent,
    resolve: {
      resp: OidcFormResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
