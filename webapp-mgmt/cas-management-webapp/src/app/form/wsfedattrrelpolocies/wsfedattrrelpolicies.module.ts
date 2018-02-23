import {NgModule} from '@angular/core';
import {FormRoutingModule} from '../form-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {WsfedattrrelpoliciesComponent} from './wsfedattrrelpolicies.component';
import {FormSharedModule} from '../form-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormSharedModule,
    SharedModule,
    FormRoutingModule,
  ],
  declarations: [
    WsfedattrrelpoliciesComponent
  ],
  exports: [
    WsfedattrrelpoliciesComponent
  ]
})

export class WsfedattrrelpoliciesModule {}
