import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SsosessionsComponent} from './ssosessions.component';

const routes: Routes = [
  {
    path: '',
    component: SsosessionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsosessionsRoutingModule { }
