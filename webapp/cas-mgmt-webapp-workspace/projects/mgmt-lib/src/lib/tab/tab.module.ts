import {NgModule} from '@angular/core';
import {TabAccessstrategyComponent} from './tab-accessstrategy/tab-accessstrategy.component';
import {TabAdvancedComponent} from './tab-advanced/tab-advanced.component';
import {CommonModule} from '@angular/common';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {TabAttrreleaseComponent} from './tab-attrrelease/tab-attrrelease.component';
import {TabBasicsComponent} from './tab-basics/tab-basics.component';
import {TabContactsComponent} from './tab-contacts/tab-contacts.component';
import {TabDelegatedComponent} from './tab-delegated/tab-delegated.component';
import {TabLogoutComponent} from './tab-logout/tab-logout.component';
import {TabMulitauthComponent} from './tab-mulitauth/tab-mulitauth.component';
import {TabOauthComponent} from './tab-oauth/tab-oauth.component';
import {TabOIDCComponent} from './tab-oidc/tab-oidc.component';
import {TabOidcAttrreleaseComponent} from './tab-oidc-attrrelease/tab-oidc-attrrelease.component';
import {TabPropertiesComponent} from './tab-properties/tab-properties.component';
import {TabProxyComponent} from './tab-proxy/tab-proxy.component';
import {TabSamlAssertionComponent} from './tab-saml-assertion/tab-saml-assertion.component';
import {TabSamlAttributesComponent} from './tab-saml-attributes/tab-saml-attributes.component';
import {TabSamlEncryptionComponent} from './tab-saml-encryption/tab-saml-encryption.component';
import {TabSamlMetadataComponent} from './tab-saml-metadata/tab-saml-metadata.component';
import {TabSamlSigningComponent} from './tab-saml-signing/tab-saml-signing.component';
import {TabSsoComponent} from './tab-sso/tab-sso.component';
import {TabAuthnPolicyComponent} from './tab-authn-policy/tab-authn-policy.component';
import {TabTicketsComponent} from './tab-tickets/tab-tickets.component';
import {TabTokensComponent} from './tab-tokens/tab-tokens.component';
import {TabUsernameattrComponent} from './tab-usernameattr/tab-usernameattr.component';
import {TabWsfedComponent} from './tab-wsfed/tab-wsfed.component';
import {TabWsfedAttrreleaseComponent} from './tab-wsfed-attrrelease/tab-wsfed-attrrelease.component';
import {FieldModule} from '@apereo/mgmt-lib/src/lib/field';
import {TabsComponent} from './tabs/tabs.component';
import {MatTabsModule} from '@angular/material/tabs';

/**
 * Tabs.
 */
@NgModule({
  declarations: [
    TabsComponent,
    TabAccessstrategyComponent,
    TabAdvancedComponent,
    TabAttrreleaseComponent,
    TabBasicsComponent,
    TabContactsComponent,
    TabDelegatedComponent,
    TabLogoutComponent,
    TabMulitauthComponent,
    TabOauthComponent,
    TabOIDCComponent,
    TabOidcAttrreleaseComponent,
    TabPropertiesComponent,
    TabProxyComponent,
    TabSamlAssertionComponent,
    TabSamlAttributesComponent,
    TabSamlEncryptionComponent,
    TabSamlMetadataComponent,
    TabSamlSigningComponent,
    TabSsoComponent,
    TabAuthnPolicyComponent,
    TabTicketsComponent,
    TabTokensComponent,
    TabUsernameattrComponent,
    TabWsfedComponent,
    TabWsfedAttrreleaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    UiModule,
    FieldModule,
    MatTabsModule
  ],
  exports: [
    TabsComponent,
    TabAccessstrategyComponent,
    TabAdvancedComponent,
    TabAttrreleaseComponent,
    TabBasicsComponent,
    TabContactsComponent,
    TabDelegatedComponent,
    TabLogoutComponent,
    TabMulitauthComponent,
    TabOauthComponent,
    TabOIDCComponent,
    TabOidcAttrreleaseComponent,
    TabPropertiesComponent,
    TabProxyComponent,
    TabSamlAssertionComponent,
    TabSamlAttributesComponent,
    TabSamlEncryptionComponent,
    TabSamlMetadataComponent,
    TabSamlSigningComponent,
    TabSsoComponent,
    TabAuthnPolicyComponent,
    TabTicketsComponent,
    TabTokensComponent,
    TabUsernameattrComponent,
    TabWsfedComponent,
    TabWsfedAttrreleaseComponent
  ]
}) export class TabModule {}
