import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WizardComponent} from './wizard/wizard.component';
import {RegisterFormComponent} from './edit/form.component';
import {RegisterFormResolve} from './form.resolve';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: RegisterFormComponent,
    resolve: {
      resp: RegisterFormResolve
    }
  },
  {
    path: 'wizard',
    component: WizardComponent,
    resolve: {
      resp: RegisterFormResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
