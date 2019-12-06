/**
 * Created by tschmidt on 2/23/17.
 */
import {NgModule} from '@angular/core';

import {FormRoutingModule} from './form-routing.module';
import {FormComponent} from './form.component';
import {TabBasicsComponent} from './tab-basics/tab-basics.component';
import {TabLogoutComponent} from './tab-logout/tab-logout.component';
import {TabAccessstrategyComponent} from './tab-accessstrategy/tab-accessstrategy.component';
import {TabMulitauthComponent} from './tab-mulitauth/tab-mulitauth.component';
import {TabProxyComponent} from './tab-proxy/tab-proxy.component';
import {TabUsernameattrComponent} from './tab-usernameattr/tab-usernameattr.component';
import {TabAttrreleaseComponent} from './tab-attrrelease/tab-attrrelease.component';
import {TabPropertiesComponent} from './tab-properties/tab-properties.component';
import { TabOauthComponent } from './tab-oauth/tab-oauth.component';
import { TabWsfedComponent } from './tab-wsfed/tab-wsfed.component';
import { TabContactsComponent } from './tab-contacts/tab-contacts.component';
import {TabOIDCComponent} from './tab-oidc/tab-oidc.component';
import {TabAdvancedComponent} from './tab-advanced/tab-advanced.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {MgmtLibModule} from 'mgmt-lib';
import { TabTokensComponent } from './tab-tokens/tab-tokens.component';
import { TabTicketsComponent } from './tab-tickets/tab-tickets.component';
import { TabSsoComponent } from './tab-sso/tab-sso.component';
import { TabSamlAttributesComponent } from './tab-saml-attributes/tab-saml-attributes.component';
import { TabSamlEncryptionComponent } from './tab-saml-encryption/tab-saml-encryption.component';
import { TabSamlSigningComponent } from './tab-saml-signing/tab-saml-signing.component';
import { TabSamlMetadataComponent } from './tab-saml-metadata/tab-saml-metadata.component';
import { TabSamlAssertionComponent } from './tab-saml-assertion/tab-saml-assertion.component';
import {TabWsfedAttrreleaseComponent} from './tab-wsfed-attrrelease/tab-wsfed-attrrelease.component';
import {TabDelegatedComponent} from './tab-delegated/tab-delegated.component';
import {TabOidcAttrreleaseComponent} from '@app/form/tab-oidc-attrrelease/tab-oidc-attrrelease.component';

@NgModule({
  imports: [
    ProjectShareModule,
    FormRoutingModule,
    MgmtLibModule
  ],
  declarations: [
    FormComponent,
    TabAdvancedComponent,
    TabBasicsComponent,
    TabLogoutComponent,
    TabAccessstrategyComponent,
    TabDelegatedComponent,
    TabMulitauthComponent,
    TabProxyComponent,
    TabUsernameattrComponent,
    TabAttrreleaseComponent,
    TabOidcAttrreleaseComponent,
    TabWsfedAttrreleaseComponent,
    TabPropertiesComponent,
    TabOauthComponent,
    TabOIDCComponent,
    TabWsfedComponent,
    FormComponent,
    TabOauthComponent,
    TabWsfedComponent,
    TabContactsComponent,
    TabTokensComponent,
    TabTicketsComponent,
    TabSsoComponent,
    TabSamlAttributesComponent,
    TabSamlEncryptionComponent,
    TabSamlSigningComponent,
    TabSamlMetadataComponent,
    TabSamlAssertionComponent,
  ]
})

export class FormModule {}
