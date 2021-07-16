import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServicenameComponent} from './servicename/servicename.component';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {EnabledComponent} from './enabled/enabled.component';
import {AccessStrategyComponent} from './access-strategy/access-strategy.component';
import { AcceptableUsagePolicyTextComponent } from './acceptable-usage-policy/text/aup-text.component';
import { AcceptableUsagePolicyMessageCode } from './acceptable-usage-policy/messageCode/aup-messagecode.component';
import { AcceptableUsagePolicyEnabledComponent } from './acceptable-usage-policy/policyEnabled/aup-enabled.component';
import {TimeComponent} from './access-strategy/time/time.component';
import {SurrogateComponent} from './access-strategy/surrogate/surrogate.component';
import {RequiredComponent} from './access-strategy/required/required.component';
import {RemoteComponent} from './access-strategy/remote/remote.component';
import {GrouperComponent} from './access-strategy/grouper/grouper.component';
import {ContactsComponent} from './contacts/contacts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {DelegatedComponent} from './delegated/delegated.component';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {ValidateEntityIdDirective} from './entityid/entityid.validate.directive';
import {EntityIdComponent} from './entityid/entityid.component';
import {EnvironmentsComponent} from './environments/environments.component';
import {EvalorderComponent} from './evalorder/evalorder.component';
import {ExpirationComponent} from './expiration/expiration.component';
import {GroovyEditorComponent} from './groovy-editor/groovy-editor.component';
import {LinkrefsComponent} from './linkrefs/linkrefs.component';
import {LogoComponent} from './logo/logo.component';
import {LogoutComponent} from './logout/logout.component';
import {LogouttypeevalComponent} from './logouttypeeval/logouttypeeval.component';
import {OauthclientComponent} from './oauthclient/oauthclient.component';
import {AccessTokenExpirationComponent} from './oauthclient/access-token-expiration/access-token-expiration.component';
import {CodeExpirationComponent} from './oauthclient/code-expiration/code-expiration.component';
import {DeviceTokenExpirationComponent} from './oauthclient/device-token-expiration/device-token-expiration.component';
import {RefreshTokenExpirationComponent} from './oauthclient/refresh-token-expiration/refresh-token-expiration.component';
import {OidcclientComponent} from './oidcclient/oidcclient.component';
import {IdtokenComponent} from './oidcclient/idtoken/idtoken.component';
import {OptionsComponent} from './oidcclient/idtoken/options/options.component';
import {JwksComponent} from './oidcclient/jwks/jwks.component';
import {UserinfoComponent} from './oidcclient/userinfo/userinfo.component';
import {PrivacyUrlComponent} from './privacy-url/privacy-url.component';
import {PropertiesComponent} from './properties/properties.component';
import {ProxyComponent} from './proxy/proxy.component';
import {ProxyTicketExpComponent} from './proxy-ticket-exp/proxy-ticket-exp.component';
import {PubkeyComponent} from './pubkey/pubkey.component';
import {RedirectUriComponent} from './redirect-uri/redirect-uri.component';
import {ResponsetypeComponent} from './responsetype/responsetype.component';
import {AssertionComponent} from './samlclient/assertion/assertion.component';
import {AttributeNameFormatsComponent} from './samlclient/attributes/attributes.component';
import {EncryptionComponent} from './samlclient/encryption/encryption.component';
import {FriendlyComponent} from './samlclient/friendly/friendly.component';
import {SamlMetadataComponent} from './samlclient/metadata/metadata.component';
import {SamlNameidComponent} from './samlclient/nameid/nameid.component';
import {SamlOptionalComponent} from './samlclient/optional/optional.component';
import {SigningComponent} from './samlclient/signing/signing.component';
import {ValueTypesComponent} from './samlclient/value-types/value-types.component';
import {ServiceIdComponent} from './service-id/service-id.component';
import {ValidateServiceIdDirective} from './service-id/service-id.validate.directive';
import {ServiceTicketExpComponent} from './service-ticket-exp/service-ticket-exp.component';
import {ServicedescComponent} from './servicedesc/servicedesc.component';
import {ServicetypeComponent} from './servicetype/servicetype.component';
import {SsoPolicyComponent} from './sso/policy/sso-policy.component';
import {SsoComponent} from './sso/sso-chain.component';
import {ThemeidComponent} from './themeid/themeid.component';
import {WsfedclientComponent} from './wsfedclient/wsfedclient.component';
import {AttributesModule} from './attributes/attributes.module';
import {AuthenticationPolicyComponent} from "./authn-policy/authn-policy.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {UidattrsModule} from './uidattrs/uidattrs.module';
import {WsfedattrrelpoliciesModule} from './wsfedattrrelpolocies/wsfedattrrelpolicies.module';
import {AttributeReleaseModule} from './attribute-release/attribute-release.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MfaModule} from './mfa/mfa.module';
import {FlexModule} from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AcceptableUsagePolicyComponent } from './acceptable-usage-policy/acceptable-usage-policy.component';


/**
 * Fields.
 */
@NgModule({
  declarations: [
    ServicenameComponent,
    EnabledComponent,
    AccessStrategyComponent,
    TimeComponent,
    SurrogateComponent,
    RequiredComponent,
    RemoteComponent,
    GrouperComponent,
    ContactsComponent,
    DelegatedComponent,
    EnabledComponent,
    ValidateEntityIdDirective,
    EntityIdComponent,
    EnvironmentsComponent,
    EvalorderComponent,
    ExpirationComponent,
    GroovyEditorComponent,
    LinkrefsComponent,
    LogoComponent,
    LogoutComponent,
    LogouttypeevalComponent,
    OauthclientComponent,
    AccessTokenExpirationComponent,
    CodeExpirationComponent,
    DeviceTokenExpirationComponent,
    RefreshTokenExpirationComponent,
    OidcclientComponent,
    IdtokenComponent,
    OptionsComponent,
    JwksComponent,
    UserinfoComponent,
    PrivacyUrlComponent,
    PropertiesComponent,
    ProxyComponent,
    ProxyTicketExpComponent,
    PubkeyComponent,
    RedirectUriComponent,
    ResponsetypeComponent,
    AssertionComponent,
    AttributeNameFormatsComponent,
    EncryptionComponent,
    FriendlyComponent,
    SamlMetadataComponent,
    SamlNameidComponent,
    SamlOptionalComponent,
    SigningComponent,
    ValueTypesComponent,
    ServiceIdComponent,
    ValidateServiceIdDirective,
    ServiceTicketExpComponent,
    ServicedescComponent,
    ServicenameComponent,
    ServicetypeComponent,
    SsoPolicyComponent,
    SsoComponent,
    AuthenticationPolicyComponent,
    ThemeidComponent,
    WsfedclientComponent,
    AcceptableUsagePolicyTextComponent,
    AcceptableUsagePolicyMessageCode,
    AcceptableUsagePolicyEnabledComponent,
    AcceptableUsagePolicyComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    AttributesModule,
    UidattrsModule,
    AttributeReleaseModule,
    MfaModule,
    WsfedattrrelpoliciesModule,
    MatFormFieldModule,
    MatTabsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    FlexModule
  ],
  exports: [
    AttributesModule,
    UidattrsModule,
    AttributeReleaseModule,
    MfaModule,
    WsfedattrrelpoliciesModule,
    ServicenameComponent,
    EnabledComponent,
    AccessStrategyComponent,
    TimeComponent,
    SurrogateComponent,
    RequiredComponent,
    RemoteComponent,
    GrouperComponent,
    ContactsComponent,
    DelegatedComponent,
    EnabledComponent,
    ValidateEntityIdDirective,
    EntityIdComponent,
    EnvironmentsComponent,
    EvalorderComponent,
    ExpirationComponent,
    GroovyEditorComponent,
    LinkrefsComponent,
    LogoComponent,
    LogoutComponent,
    LogouttypeevalComponent,
    OauthclientComponent,
    AccessTokenExpirationComponent,
    CodeExpirationComponent,
    DeviceTokenExpirationComponent,
    RefreshTokenExpirationComponent,
    OidcclientComponent,
    IdtokenComponent,
    OptionsComponent,
    JwksComponent,
    UserinfoComponent,
    PrivacyUrlComponent,
    PropertiesComponent,
    ProxyComponent,
    ProxyTicketExpComponent,
    PubkeyComponent,
    RedirectUriComponent,
    ResponsetypeComponent,
    AssertionComponent,
    AttributeNameFormatsComponent,
    EncryptionComponent,
    FriendlyComponent,
    SamlMetadataComponent,
    SamlNameidComponent,
    SamlOptionalComponent,
    SigningComponent,
    ValueTypesComponent,
    ServiceIdComponent,
    ValidateServiceIdDirective,
    ServiceTicketExpComponent,
    ServicedescComponent,
    ServicenameComponent,
    ServicetypeComponent,
    SsoPolicyComponent,
    SsoComponent,
    AuthenticationPolicyComponent,
    ThemeidComponent,
    WsfedclientComponent,
    AcceptableUsagePolicyTextComponent,
    AcceptableUsagePolicyMessageCode,
    AcceptableUsagePolicyEnabledComponent,
    AcceptableUsagePolicyComponent
  ]
})
export class FieldModule { }
