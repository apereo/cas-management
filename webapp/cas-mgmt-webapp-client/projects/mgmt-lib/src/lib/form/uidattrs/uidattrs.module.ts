import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousComponent } from './anonymous/anonymous.component';
import {FormsModule} from '@angular/forms';
import {UidattrsComponent} from './uidattrs.component';
import { PrincipalComponent } from './principal/principal.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    UidattrsComponent,
    AnonymousComponent,
    PrincipalComponent
  ],
  exports: [
    UidattrsComponent
  ]
})
export class UidattrsModule { }
