import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'registry',
    loadChildren: () => import('@apereo/mgmt-lib').then(m => m.RegistryModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'version-control',
    loadChildren: () => import('@apereo/mgmt-lib').then(m => m.VersionControlModule)
  },
  {
    path: 'delegated',
    loadChildren: () => import('@apereo/mgmt-lib').then(m => m.DelegatedModule)
  },
  {
    path: 'submissions',
    loadChildren: () => import('@apereo/mgmt-lib').then(m => m.SubmissionsModule)
  },
  {
    path: 'definitions',
    loadChildren: () => import('@apereo/mgmt-lib').then(m => m.DefinitionStoreModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registry'
  },
  {
    path: '**',
    redirectTo: 'registry'
  }
];

/**
 * Main routing module for the application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
