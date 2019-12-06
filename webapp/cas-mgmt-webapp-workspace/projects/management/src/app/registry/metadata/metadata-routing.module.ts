import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MetadataComponent} from './metadata.component';
import {MetadataResolver} from './metadata.resolover';

const routes: Routes = [
  {
    path: ':id',
    component: MetadataComponent,
    resolve: {
      resp: MetadataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataRoutingModule { }
