import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotesComponent} from './notes/notes.component';
import {PullComponent} from './pull/pull.component';
import {SubmitsComponent} from './submits/submits.component';
import {SubmitsResolver} from './submits/submits.resolver';
import {PullResolver} from './pull/pull.resolver';

const routes: Routes = [
  {
    path: 'pulls',
    component: PullComponent,
    resolve: {
      resp: PullResolver
    }
  },
  {
    path: 'submit',
    component: SubmitsComponent,
    resolve: {
      resp: SubmitsResolver
    }
  },
  {
    path: 'notes/:id',
    component: NotesComponent
  }
];

/**
 * Routing module for delegated module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelegatedRoutingModule { }
