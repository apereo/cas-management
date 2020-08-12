import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggersComponent} from './loggers.component';
import {LoggersResolve} from './loggers.resolve';

const routes: Routes = [
  {
    path: '',
    component: LoggersComponent,
    resolve: {
      resp: LoggersResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggersRoutingModule { }
