import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WsfedattrrelpoliciesComponent} from './wsfedattrrelpolicies.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    WsfedattrrelpoliciesComponent
  ],
  exports: [
    WsfedattrrelpoliciesComponent
  ]
})

export class WsfedattrrelpoliciesModule {}
