import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousComponent } from './anonymous/anonymous.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UidattrsComponent} from './uidattrs.component';
import { PrincipalComponent } from './principal/principal.component';
import {SharedModule} from '../../shared/shared.module';
import {GroovyComponent} from './groovy/groovy.component';
import {ScriptComponent} from './script/script.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UidattrsComponent,
    AnonymousComponent,
    PrincipalComponent,
    GroovyComponent,
    ScriptComponent
  ],
  exports: [
    UidattrsComponent
  ]
})
export class UidattrsModule { }
