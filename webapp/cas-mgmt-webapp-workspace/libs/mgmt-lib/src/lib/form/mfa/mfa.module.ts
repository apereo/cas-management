import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MfaComponent} from './mfa.component';
import {GroovyComponent} from './groovy/groovy.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DefaultComponent} from './default/default.component';
import {SharedLibModule} from 'shared-lib';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedLibModule
  ],
  declarations: [
    MfaComponent,
    GroovyComponent,
    DefaultComponent
  ],
  exports: [
    MfaComponent
  ]
})
export class MfaModule { }
