import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReleaseComponent} from './release.component';

const routes: Routes = [
  {
    path: '',
    component: ReleaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseRoutingModule { }
