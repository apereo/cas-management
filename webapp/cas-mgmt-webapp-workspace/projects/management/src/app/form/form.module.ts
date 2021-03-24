import {NgModule} from '@angular/core';

import {FormRoutingModule} from './form-routing.module';
import {FormComponent} from './form.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {UiModule, TabModule} from '@apereo/mgmt-lib';

/**
 * Module to lazy-load form components for the application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  imports: [
    ProjectShareModule,
    FormRoutingModule,
    UiModule,
    TabModule
  ],
  declarations: [
    FormComponent
  ]
})

export class FormModule {}
