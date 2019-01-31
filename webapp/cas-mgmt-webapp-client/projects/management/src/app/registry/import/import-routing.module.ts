import {RouterModule, Routes} from '@angular/router';
import {DomainsComponent} from '@app/registry/domains/domains.component';
import {DomainsResolver} from '@app/registry/domains/domains.resolver';
import {NgModule} from '@angular/core';
import {ImportComponent} from '@app/registry/import/import.component';

const routes: Routes = [
  {
    path: '',
    component: ImportComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
