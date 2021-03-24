import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MfaComponent} from './mfa.component';
import { GroovyComponent } from './groovy/groovy.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DefaultComponent } from './default/default.component';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

/**
 * Module lazy-loaded for MFA functionality.
 *
 * @author Travis Schmidt
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UiModule,
    MatFormFieldModule,
    MatSelectModule
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
