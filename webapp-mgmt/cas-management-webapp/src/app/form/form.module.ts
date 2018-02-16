/**
 * Created by tschmidt on 2/23/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

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
import {EnabledComponent} from './enabled/enabled.component';
import {EvalorderComponent} from './evalorder/evalorder.component';
import {LinkrefsComponent} from './linkrefs/linkrefs.component';
import {LogoComponent} from './logo/logo.component';
import {LogoutComponent} from './logout/logout.component';
import {LogouttypeevalComponent} from './logouttypeeval/logouttypeeval.component';
import {MultiauthpaneComponent} from './multiauthpane/multiauthpane.component';
import {OauthclientComponent} from './oauthclient/oauthclient.component';
import {PropertiespaneComponent} from './propertiespane/propertiespane.component';
import {ProxyComponent} from './proxy/proxy.component';
import {PubkeyComponent} from './pubkey/pubkey.component';
import {ReqhandlersComponent} from './reqhandlers/reqhandlers.component';
import {ServicedescComponent} from './servicedesc/servicedesc.component';
import {ServiceidComponent} from './serviceid/serviceid.component';
import {ServicenameComponent} from './servicename/servicename.component';
import {ServicetypeComponent} from './servicetype/servicetype.component';
import {ThemeidComponent} from './themeid/themeid.component';
import {UidattrsComponent} from './uidattrs/uidattrs.component';
import {Data} from './data';
import {SharedModule} from '../shared/shared.module';
import {TabAdvancedComponent} from './tab-advanced/tab-advanced.component';
import { WsfedclientComponent } from './wsfedclient/wsfedclient.component';
import { SamlservicespaneComponent } from './samlservicespane/samlservicespane.component';
import { OidcclientComponent } from './oidcclient/oidcclient.component';
import { TabOauthComponent } from './tab-oauth/tab-oauth.component';
import { TabSamlComponent } from './tab-saml/tab-saml.component';
import { TabWsfedComponent } from './tab-wsfed/tab-wsfed.component';
import {TabBaseComponent} from './tab-base';
import { ContactsComponent } from './contacts/contacts.component';
import { TabContactsComponent } from './tab-contacts/tab-contacts.component';
import { ExpirationComponent } from './expiration/expiration.component';
import { TabExpirationComponent } from './tab-expiration/tab-expiration.component';
import { MetadataComponent } from './samlclient/metadata/metadata.component';
import { SecurityComponent } from './samlclient/security/security.component';
import { OptionalComponent } from './samlclient/optional/optional.component';
import { NameidComponent } from './samlclient/nameid/nameid.component';
import {TabOIDCComponent} from './tab-oidc/tab-oidc.component';
import {InvalidDomainDirective} from './serviceid/invalid-domain.directive';
import { ResponsetypeComponent } from './responsetype/responsetype.component';
import { InputComponent } from './input/input.component';
import { HintComponent } from './hint/hint.component';
import { HelpDirective } from './help.directive';
import {AttributeReleaseModule} from './attribute-release/attribute-release.module';
import {AccessStrategyModule} from './access-strategy/access-strategy.module';
import {AttributemappingModule} from './attributemapping/attributemapping.module';
import {WsfedattrrelpoliciesModule} from './wsfedattrrelpolocies/wsfedattrrelpolicies.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule,
    FormRoutingModule,
    AccessStrategyModule,
    AttributeReleaseModule,
    AttributemappingModule,
    WsfedattrrelpoliciesModule
  ],
  declarations: [
    FormComponent,
    TabBasicsComponent,
    TabLogoutComponent,
    TabAccessstrategyComponent,
    TabMulitauthComponent,
    TabProxyComponent,
    TabUsernameattrComponent,
    TabAttrreleaseComponent,
    TabPropertiesComponent,
    TabAdvancedComponent,
    TabSamlComponent,
    TabOauthComponent,
    TabOIDCComponent,
    TabWsfedComponent,
    TabBaseComponent,
    FormComponent,
    EnabledComponent,
    EvalorderComponent,
    LinkrefsComponent,
    LogoComponent,
    LogoutComponent,
    LogouttypeevalComponent,
    MultiauthpaneComponent,
    OauthclientComponent,
    PropertiespaneComponent,
    ProxyComponent,
    PubkeyComponent,
    ReqhandlersComponent,
    ServicedescComponent,
    ServiceidComponent,
    ServicenameComponent,
    ServicetypeComponent,
    ThemeidComponent,
    UidattrsComponent,
    WsfedclientComponent,
    SamlservicespaneComponent,
    OidcclientComponent,
    TabOauthComponent,
    TabSamlComponent,
    TabWsfedComponent,
    ContactsComponent,
    TabContactsComponent,
    ExpirationComponent,
    TabExpirationComponent,
    MetadataComponent,
    SecurityComponent,
    OptionalComponent,
    NameidComponent,
    InvalidDomainDirective,
    ResponsetypeComponent,
    InputComponent,
    HintComponent,
    HelpDirective
  ],
  providers: [
    FormResolve,
    FormService,
    Data
  ]
})

export class FormModule {}
