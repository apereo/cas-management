import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from './core/init.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./forms/form.module').then(m => m.FormModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'pending',
    loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule)
  },
  {
    path: '',
    component: InitComponent
  }
];

/**
 * Top level routing module for the register application.
 */
@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
