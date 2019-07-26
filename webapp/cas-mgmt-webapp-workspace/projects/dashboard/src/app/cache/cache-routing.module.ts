import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CacheComponent} from './cache.component';
import {CacheResolve} from './cache.resolve';

const routes: Routes = [
  {
    path: '',
    component: CacheComponent,
    resolve: {
      resp: CacheResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CacheRoutingModule { }
