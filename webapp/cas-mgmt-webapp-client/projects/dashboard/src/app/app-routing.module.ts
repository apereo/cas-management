import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitComponent} from './core/init.component';

const routes: Routes = [
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
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
