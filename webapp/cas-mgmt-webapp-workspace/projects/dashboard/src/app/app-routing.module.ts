import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnauthorizedComponent} from './core/unauthorized/unauthorized.component';
import {AdminGuard} from './core/admin.guard';

const routes: Routes = [
  {
    path: 'cache',
    loadChildren: () => import('./cache/cache.module').then(m => m.CacheModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'resolve',
    loadChildren: () => import('./resolve/resolve.module').then(m => m.ResolveModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'release',
    loadChildren: () => import('./release/release.module').then(m => m.ReleaseModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'sessions',
    loadChildren: () => import('./ssosession/ssosession.module').then(m => m.SsosessionModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
