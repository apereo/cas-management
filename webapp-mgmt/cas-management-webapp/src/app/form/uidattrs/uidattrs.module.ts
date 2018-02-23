import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormSharedModule} from '../form-shared.module';
import {FormModule} from '../form.module';
import { AnonymousComponent } from './anonymous/anonymous.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {UidattrsComponent} from './uidattrs.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormSharedModule,
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
