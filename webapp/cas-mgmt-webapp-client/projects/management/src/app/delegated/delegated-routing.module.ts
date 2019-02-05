import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pulls',
    loadChildren: './pull/pull.module#PullModule'
  },
  {
    path: 'submit',
    loadChildren: './submits/submits.module#SubmitsModule'
  },
  {
    path: 'notes',
    loadChildren: './notes/notes.module#NotesModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelegatedRoutingModule { }
