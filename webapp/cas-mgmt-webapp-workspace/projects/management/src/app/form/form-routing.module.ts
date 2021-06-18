import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from './form.component';
import {FormResolve} from './form.resolve';
import {SamlResolve} from './saml-resolve';
import {OAuthResolve} from './oauth-resolve';
import {OidcResolve} from './oidc-resolve';
import {
  TabAccessstrategyComponent,
  TabAdvancedComponent,
  TabAttrreleaseComponent,
  TabBasicsComponent,
  TabContactsComponent,
  TabDelegatedComponent,
  TabLogoutComponent,
  TabMulitauthComponent,
  TabOauthComponent,
  TabOidcAttrreleaseComponent,
  TabOIDCComponent,
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
  TabWsfedAttrreleaseComponent,
  TabWsfedComponent
} from '@apereo/mgmt-lib';

export const childRoutes: Routes = [
  {
    path: 'basics',
    component: TabBasicsComponent,
    outlet: 'form'
  },
  {
    path: 'saml-metadata',
    component: TabSamlMetadataComponent,
    outlet: 'form'
  },
  {
    path: 'saml-assertion',
    component: TabSamlAssertionComponent,
    outlet: 'form'
  },
  {
    path: 'saml-attributes',
    component: TabSamlAttributesComponent,
    outlet: 'form'
  },
  {
    path: 'saml-encryption',
    component: TabSamlEncryptionComponent,
    outlet: 'form'
  },
  {
    path: 'saml-signing',
    component: TabSamlSigningComponent,
    outlet: 'form'
  },
  {
    path: 'oauth',
    component: TabOauthComponent,
    outlet: 'form'
  },
  {
    path: 'tokens',
    component: TabTokensComponent,
    outlet: 'form'
  },
  {
    path: 'oidc',
    component: TabOIDCComponent,
    outlet: 'form'
  },
  {
    path: 'wsfed',
    component: TabWsfedComponent,
    outlet: 'form'
  },
  {
    path: 'contacts',
    component: TabContactsComponent,
    outlet: 'form'
  },
  {
    path: 'logout',
    component: TabLogoutComponent,
    outlet: 'form'
  },
  {
    path: 'accessstrategy',
    component: TabAccessstrategyComponent,
    outlet: 'form'
  },
  {
    path: 'delegated',
    component: TabDelegatedComponent,
    outlet: 'form'
  },
  {
    path: 'tickets',
    component: TabTicketsComponent,
    outlet: 'form'
  },
  {
    path: 'multiauth',
    component: TabMulitauthComponent,
    outlet: 'form'
  },
  {
    path: 'proxy',
    component: TabProxyComponent,
    outlet: 'form'
  },
  {
    path: 'userattr',
    component: TabUsernameattrComponent,
    outlet: 'form'
  },
  {
    path: 'attrRelease',
    component: TabAttrreleaseComponent,
    outlet: 'form'
  },
  {
    path: 'sso',
    component: TabSsoComponent,
    outlet: 'form'
  },
  {
    path: 'authnPolicy',
    component: TabAuthnPolicyComponent,
    outlet: 'form'
  },
  {
    path: 'scopes',
    component: TabOidcAttrreleaseComponent,
    outlet: 'form'
  },
  {
    path: 'claims',
    component: TabWsfedAttrreleaseComponent,
    outlet: 'form'
  },
  {
    path: 'properties',
    component: TabPropertiesComponent,
    outlet: 'form'
  },
  {
    path: 'advanced',
    component: TabAdvancedComponent,
    outlet: 'form'
  }
];

/**
 * Routing module for form module.
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'duplicate/:id',
        component: FormComponent,
        resolve: {
          resp: FormResolve
        },
        children: childRoutes,
        data: {
          duplicate: true,
        }
      },
      {
        path: 'view/:id',
        component: FormComponent,
        resolve: {
          resp: FormResolve
        },
        children: childRoutes,
        data: {
          view: true
        }
      },
      {
        path: 'edit/:id',
        component: FormComponent,
        resolve: {
          resp: FormResolve
        },
        children: childRoutes
      },
      {
        path: 'saml',
        component: FormComponent,
        resolve : {
          resp: SamlResolve
        },
        children: childRoutes,
        data: {
          created: true
        }
      },
      {
        path: 'oauth',
        component: FormComponent,
        resolve: {
          resp: OAuthResolve
        },
        children: childRoutes,
        data: {
          created: true
        }
      },
      {
        path: 'oidc',
        component: FormComponent,
        resolve: {
          resp: OidcResolve
        },
        children: childRoutes,
        data: {
          created: true
        }
      },
      {
        path: 'importService',
        component: FormComponent,
        children: childRoutes,
        resolve: {
          resp: FormResolve
        },
        data: {
          import: true
        }

      }
    ])
  ],
  exports: [ RouterModule ]
})

export class FormRoutingModule {}

