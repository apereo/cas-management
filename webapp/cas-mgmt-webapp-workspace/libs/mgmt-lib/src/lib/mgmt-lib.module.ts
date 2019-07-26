import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceIdComponent} from './form/service-id/service-id.component';
import {ValidateServiceIdDirective} from './form/service-id/service-id.validate.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicedescComponent} from './form/servicedesc/servicedesc.component';
import {ServicetypeComponent} from './form/servicetype/servicetype.component';
import {ServicenameComponent} from './form/servicename/servicename.component';
import {LinkrefsComponent} from './form/linkrefs/linkrefs.component';
import {LogoComponent} from './form/logo/logo.component';
import {AccessStrategyModule} from './form/access-strategy/access-strategy.module';
import {AttributeReleaseModule} from './form/attribute-release/attribute-release.module';
import {WsfedattrrelpoliciesModule} from './form/wsfedattrrelpolocies/wsfedattrrelpolicies.module';
import {ContactsComponent} from './form/contacts/contacts.component';
import {EnabledComponent} from './form/enabled/enabled.component';
import {EvalorderComponent} from './form/evalorder/evalorder.component';
import {ExpirationComponent} from './form/expiration/expiration.component';
import {LogoutComponent} from './form/logout/logout.component';
import {LogouttypeevalComponent} from './form/logouttypeeval/logouttypeeval.component';
import {MfaModule} from './form/mfa/mfa.module';
import {OauthclientComponent} from './form/oauthclient/oauthclient.component';
import {OidcclientComponent} from './form/oidcclient/oidcclient.component';
import {OptionsComponent} from './form/oidcclient/idtoken/options/options.component';
import {PropertiespaneComponent} from './form/propertiespane/propertiespane.component';
import {ProxyComponent} from './form/proxy/proxy.component';
import {PubkeyComponent} from './form/pubkey/pubkey.component';
import {RequiredHandlersComponent} from './form/reqhandlers/reqhandlers.component';
import {ResponsetypeComponent} from './form/responsetype/responsetype.component';
import {SamlMetadataComponent} from './form/samlclient/metadata/metadata.component';
import {SamlNameidComponent} from './form/samlclient/nameid/nameid.component';
import {SamlOptionalComponent} from './form/samlclient/optional/optional.component';
import {ThemeidComponent} from './form/themeid/themeid.component';
import {UidattrsModule} from './form/uidattrs/uidattrs.module';
import {WsfedclientComponent} from './form/wsfedclient/wsfedclient.component';
import { PrivacyUrlComponent } from './form/privacy-url/privacy-url.component';
import {EnvironmentsComponent} from './form/environments/environments.component';
import {OauthComponent} from './form/attribute-release/policies/oauth/oauth.component';
import {MappedComponent} from './form/attribute-release/policies/mapped/mapped.component';
import {RedirectUriComponent} from './form/redirect-uri/redirect-uri.component';
import { CodeExpirationComponent } from './form/oauthclient/code-expiration/code-expiration.component';
import { AccessTokenExpirationComponent } from './form/oauthclient/access-token-expiration/access-token-expiration.component';
import { RefreshTokenExpirationComponent } from './form/oauthclient/refresh-token-expiration/refresh-token-expiration.component';
import { DeviceTokenExpirationComponent } from './form/oauthclient/device-token-expiration/device-token-expiration.component';
import { JwksComponent } from './form/oidcclient/jwks/jwks.component';
import { IdtokenComponent } from './form/oidcclient/idtoken/idtoken.component';
import { UserinfoComponent } from './form/oidcclient/userinfo/userinfo.component';
import { ServiceTicketExpComponent } from './form/service-ticket-exp/service-ticket-exp.component';
import { ProxyTicketExpComponent } from './form/proxy-ticket-exp/proxy-ticket-exp.component';
import { SsoPolicyComponent } from './form/sso-policy/sso-policy.component';
import {SsoChainComponent} from './form/sso-policy/sso-chain/sso-chain.component';
import { SigningComponent } from './form/samlclient/signing/signing.component';
import { AttributeNameFormatsComponent } from './form/samlclient/attributes/attributes.component';
import { AssertionComponent } from './form/samlclient/assertion/assertion.component';
import { FriendlyComponent } from './form/samlclient/friendly/friendly.component';
import { ValueTypesComponent } from './form/samlclient/value-types/value-types.component';
import {EncryptionComponent} from './form/samlclient/encryption/encryption.component';
import {SharedLibModule} from 'shared-lib';
import {AttributesModule} from './form/attributes/attributes.module';
import {BaseFormComponent} from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedLibModule,
    FormsModule,
    ReactiveFormsModule,
    AccessStrategyModule,
    AttributeReleaseModule,
    WsfedattrrelpoliciesModule,
    MfaModule,
    UidattrsModule,
    AttributesModule
  ],
  declarations: [
    ServiceIdComponent,
    RedirectUriComponent,
    ServicedescComponent,
    ServicetypeComponent,
    ServicenameComponent,
    LinkrefsComponent,
    LogoComponent,
    ValidateServiceIdDirective,
    ContactsComponent,
    EnabledComponent,
    EvalorderComponent,
    ExpirationComponent,
    LogoutComponent,
    LogouttypeevalComponent,
    OauthclientComponent,
    OidcclientComponent,
    PropertiespaneComponent,
    ProxyComponent,
    PubkeyComponent,
    RequiredHandlersComponent,
    ResponsetypeComponent,
    SamlMetadataComponent,
    SamlNameidComponent,
    SamlOptionalComponent,
    ThemeidComponent,
    WsfedclientComponent,
    PrivacyUrlComponent,
    EnvironmentsComponent,
    CodeExpirationComponent,
    AccessTokenExpirationComponent,
    RefreshTokenExpirationComponent,
    DeviceTokenExpirationComponent,
    JwksComponent,
    IdtokenComponent,
    UserinfoComponent,
    ServiceTicketExpComponent,
    ProxyTicketExpComponent,
    SsoPolicyComponent,
    SsoChainComponent,
    SigningComponent,
    AttributeNameFormatsComponent,
    AssertionComponent,
    FriendlyComponent,
    ValueTypesComponent,
    EncryptionComponent,
    OptionsComponent,
    BaseFormComponent
  ],
  exports: [
    ServiceIdComponent,
    RedirectUriComponent,
    ServicedescComponent,
    ServicetypeComponent,
    ServicenameComponent,
    LinkrefsComponent,
    LogoComponent,
    AccessStrategyModule,
    AttributeReleaseModule,
    WsfedattrrelpoliciesModule,
    ContactsComponent,
    EnabledComponent,
    EvalorderComponent,
    ExpirationComponent,
    LogoutComponent,
    LogouttypeevalComponent,
    MfaModule,
    AttributesModule,
    OauthclientComponent,
    OidcclientComponent,
    PropertiespaneComponent,
    ProxyComponent,
    PubkeyComponent,
    RequiredHandlersComponent,
    ResponsetypeComponent,
    SamlMetadataComponent,
    SamlNameidComponent,
    SamlOptionalComponent,
    ThemeidComponent,
    UidattrsModule,
    WsfedclientComponent,
    PrivacyUrlComponent,
    EnvironmentsComponent,
    MappedComponent,
    CodeExpirationComponent,
    AccessTokenExpirationComponent,
    RefreshTokenExpirationComponent,
    DeviceTokenExpirationComponent,
    JwksComponent,
    IdtokenComponent,
    UserinfoComponent,
    ServiceTicketExpComponent,
    ProxyTicketExpComponent,
    SsoPolicyComponent,
    SsoChainComponent,
    SigningComponent,
    AttributeNameFormatsComponent,
    AssertionComponent,
    FriendlyComponent,
    ValueTypesComponent,
    EncryptionComponent,
    OptionsComponent,
    BaseFormComponent
  ]
})
export class MgmtLibModule { }
