import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from './core/init.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'lookup',
    loadChildren: () => import('./lookup/lookup.module').then(m => m.LookupModule)
  },
  {
    path: 'pending',
    loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule)
  },
  {
    path: 'sessions',
    loadChildren: () => import('./ssosessions/ssosessions.module').then(m => m.SsosessionsModule)
  },
  {
    path: 'tokens',
    loadChildren: () => import('./tokens/tokens.module').then(m => m.TokensModule)
  },
  {
    path: '',
    component: InitComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
