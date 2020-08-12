/**
 * Created by tschmidt on 2/23/17.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from './core/init.component';

const routes: Routes = [
  {
    path: 'registry',
    loadChildren: () => import('./registry/registry.module').then(m => m.RegistryModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'version-control',
    loadChildren: () => import('./version-control/version-control.module').then(m => m.VersionControlModule)
  },
  {
    path: 'delegated',
    loadChildren: () => import('./delegated/delegated.module').then(m => m.DelegatedModule)
  },
  {
    path: '',
    component: InitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
