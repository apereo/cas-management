import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from './core/init.component';

const routes: Routes = [
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
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
