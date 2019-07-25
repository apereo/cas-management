import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'cache',
    loadChildren: () => import('./cache/cache.module').then(m => m.CacheModule)
  },
  {
    path: 'resolve',
    loadChildren: () => import('./resolve/resolve.module').then(m => m.ResolveModule)
  },
  {
    path: 'release',
    loadChildren: () => import('./release/release.module').then(m => m.ReleaseModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule)
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
