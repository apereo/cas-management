/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import {InitComponent} from './core/init.component';

@NgModule({
  imports: [
    RouterModule.forRoot( [
      {
        path: 'registry',
        loadChildren: './registry/registry.module#RegistryModule'
      },
      {
        path: 'form',
        loadChildren: './form/form.module#FormModule'
      },
      {
        path: 'version-control',
        loadChildren: './version-control/version-control.module#VersionControlModule'
      },
      {
        path: 'delegated',
        loadChildren: './delegated/delegated.module#DelegatedModule'
      },
      {
        path: '',
        component: InitComponent
      }
    ]),
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
