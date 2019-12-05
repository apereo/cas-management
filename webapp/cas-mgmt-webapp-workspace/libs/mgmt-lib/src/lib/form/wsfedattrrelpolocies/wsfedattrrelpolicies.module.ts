import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WsfedattrrelpoliciesComponent} from './wsfedattrrelpolicies.component';
import {SharedLibModule} from 'shared-lib';
import {AttributesModule} from '../attributes/attributes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedLibModule,
    AttributesModule
  ],
  declarations: [
    WsfedattrrelpoliciesComponent
  ],
  exports: [
    WsfedattrrelpoliciesComponent
  ]
})

export class WsfedattrrelpoliciesModule {}
