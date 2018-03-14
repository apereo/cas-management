/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import {FormComponent} from './form/form.component';
import {RegisterComponent} from './register.component';
import {SubmitComponent} from './submit/submit.component';

@NgModule({
  imports: [
    RouterModule.forRoot( [
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: 'submitted',
        component: SubmitComponent
      },
      {
        path: 'register.html',
        component: RegisterComponent
      }
    ])
  ],
  exports: [ RouterModule ]
})

export class RegisterRoutingModule {}
