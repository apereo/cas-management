import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WsfedattrrelpoliciesComponent} from './wsfedattrrelpolicies.component';
import {AttributesModule} from '../attributes/attributes.module';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Module to lazy-load functionality for WS Federation attributes.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
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
