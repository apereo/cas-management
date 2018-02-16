import {NgModule} from '@angular/core';
import {FormRoutingModule} from '../form-routing.module';
import {AttributemappingModule} from '../attributemapping/attributemapping.module';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {WsfedattrrelpoliciesComponent} from './wsfedattrrelpolicies.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
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