import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PullComponent} from './pull/pull.component';
import {PullResolver} from './pull/pull.resolver';
import {SubmitsComponent} from './submits/submits.component';
import {SubmitsResolver} from './submits/submits.resolver';
import {NotesComponent} from './notes/notes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pulls',
        component: PullComponent,
        resolve: {
          resp: PullResolver
        }
      },
      {
        path: 'submits',
        component: SubmitsComponent,
        resolve: {
          resp: SubmitsResolver
        }
      },

      {
        path: 'notes/:id',
        component: NotesComponent
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DelegatedRoutingModule{}
