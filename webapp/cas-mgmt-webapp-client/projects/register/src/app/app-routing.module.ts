import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from './core/init.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: './form/form.module#FormModule'
  },
  {
    path: 'services',
    loadChildren: './services/services.module#ServicesModule'
  },
  {
    path: 'lookup',
    loadChildren: './lookup/lookup.module#LookupModule'
  },
  {
    path: 'pending',
    loadChildren: './pending/pending.module#PendingModule'
  },
  {
    path: 'sessions',
    loadChildren: './ssosessions/ssosessions.module#SsosessionsModule'
  },
  {
    path: 'tokens',
    loadChildren: './tokens/tokens.module#TokensModule'
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
