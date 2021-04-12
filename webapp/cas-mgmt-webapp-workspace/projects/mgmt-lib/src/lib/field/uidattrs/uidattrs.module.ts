import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousComponent } from './anonymous/anonymous.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UidattrsComponent} from './uidattrs.component';
import { PrincipalComponent } from './principal/principal.component';
import {GroovyComponent} from './groovy/groovy.component';
import {ScriptComponent} from './script/script.component';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { DefaultComponent } from './default/default.component';

/**
 * Module to lazy-load functionality for UID Attributes.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [
    UidattrsComponent,
    AnonymousComponent,
    PrincipalComponent,
    GroovyComponent,
    ScriptComponent,
    DefaultComponent
  ],
  exports: [
    UidattrsComponent
  ]
})
export class UidattrsModule { }
