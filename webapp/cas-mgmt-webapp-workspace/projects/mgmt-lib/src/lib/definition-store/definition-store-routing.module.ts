import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefinitionComponent} from './definition/definition.component';
import {DefinitionResolve} from './definition/definition.resolve';
import {ListComponent} from './list/list.component';
import {DefinitionStoreResolver} from './definition-store.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      resp: DefinitionStoreResolver
    }
  },
  {
    path: ':key',
    component: DefinitionComponent,
    resolve: {
      resp: DefinitionResolve
    }
  }
];

/**
 * Module for Attribute Definitions.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinitionStoreRoutingModule { }
