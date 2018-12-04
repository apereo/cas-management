/**
 * Created by tschmidt on 2/23/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FormRoutingModule} from './form-routing.module';
import {FormComponent} from './form.component';
import {FormResolve} from './form.resolover';
import {TabBasicsComponent} from './tab-basics/tab-basics.component';
import {TabLogoutComponent} from './tab-logout/tab-logout.component';
import {TabAccessstrategyComponent} from './tab-accessstrategy/tab-accessstrategy.component';
import {TabMulitauthComponent} from './tab-mulitauth/tab-mulitauth.component';
import {TabProxyComponent} from './tab-proxy/tab-proxy.component';
import {TabUsernameattrComponent} from './tab-usernameattr/tab-usernameattr.component';
import {TabAttrreleaseComponent} from './tab-attrrelease/tab-attrrelease.component';
import {TabPropertiesComponent} from './tab-properties/tab-properties.component';
import {FormService} from './form.service';
import { TabOauthComponent } from './tab-oauth/tab-oauth.component';
import { TabSamlComponent } from './tab-saml/tab-saml.component';
import { TabWsfedComponent } from './tab-wsfed/tab-wsfed.component';
import { TabContactsComponent } from './tab-contacts/tab-contacts.component';
import { TabExpirationComponent } from './tab-expiration/tab-expiration.component';
import {TabOIDCComponent} from './tab-oidc/tab-oidc.component';
import {TabAdvancedComponent} from './tab-advanced/tab-advanced.component';
import {MgmtLibModule, SharedModule} from 'mgmt-lib';
import {MgmtModule} from '../mgmt.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule,
    SharedModule,
    MgmtModule,
    MgmtLibModule
  ],
  declarations: [
    FormComponent,
    TabAdvancedComponent,
    TabBasicsComponent,
    TabLogoutComponent,
    TabAccessstrategyComponent,
    TabMulitauthComponent,
    TabProxyComponent,
    TabUsernameattrComponent,
    TabAttrreleaseComponent,
    TabPropertiesComponent,
    TabSamlComponent,
    TabOauthComponent,
    TabOIDCComponent,
    TabWsfedComponent,
    FormComponent,
    TabOauthComponent,
    TabSamlComponent,
    TabWsfedComponent,
    TabContactsComponent,
    TabExpirationComponent,
  ],
  providers: [
    FormResolve,
    FormService
  ]
})

export class FormModule {}
