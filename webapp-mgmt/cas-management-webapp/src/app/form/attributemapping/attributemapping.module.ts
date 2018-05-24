import {FormsModule} from '@angular/forms';
import {FormRoutingModule} from '../form-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AttributemappingComponent} from './attributemapping.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports : [
    CommonModule,
    FormsModule,
    SharedModule,
    FormRoutingModule
  ],
  declarations: [
    AttributemappingComponent
  ],
  exports: [
    AttributemappingComponent
  ]
})

export class AttributemappingModule {}
