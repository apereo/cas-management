/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import {RegisterFormComponent} from './form/form.component';
import {RegisterComponent} from './register.component';
import {SubmitComponent} from './submit/submit.component';
import {ServicesComponent} from './services/services.component';
import {ServicesResolve} from './services/services.resolover';
import {WizzardComponent} from './wizzard/wizzard.component';
import {RegisterFormResolve} from './form/form.resolve';
import {InitComponent} from './init.component';

@NgModule({
  imports: [
    RouterModule.forRoot( [
      {
        path: 'registerForm/:id',
        component: RegisterFormComponent,
        resolve: {
          resp: RegisterFormResolve
        }
      },
      {
        path: 'wizzard',
        component: WizzardComponent
      },
      {
        path: 'services',
        component: ServicesComponent,
        resolve: {
          resp: ServicesResolve
        }
      },
      {
        path: 'register.html',
        component: InitComponent
      }
    ])
  ],
  exports: [ RouterModule ]
})

export class RegisterRoutingModule {}
