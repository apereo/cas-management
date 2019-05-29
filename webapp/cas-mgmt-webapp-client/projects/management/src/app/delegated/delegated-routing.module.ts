import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pulls',
    loadChildren: () => import('./pull/pull.module').then(m => m.PullModule)
  },
  {
    path: 'submits',
    loadChildren: () => import('./submits/submits.module').then(m => m.SubmitsModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelegatedRoutingModule { }
