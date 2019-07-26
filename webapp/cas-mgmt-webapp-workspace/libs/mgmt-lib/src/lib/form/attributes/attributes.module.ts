import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AttributesComponent} from './attributes.component';
import {SharedLibModule} from 'shared-lib';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedLibModule
  ],
  declarations: [
    AttributesComponent
  ],
  exports: [
    AttributesComponent
  ]
})
export class AttributesModule {}
