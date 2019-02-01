import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { OauthComponent } from './oauth/oauth.component';
import { OidcComponent } from './oidc/oidc.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [OauthComponent, OidcComponent],
  imports: [
    ProjectShareModule,
    FormRoutingModule
  ]
})
export class FormModule { }
