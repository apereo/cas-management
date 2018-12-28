import { NgModule } from '@angular/core';

import { FormRoutingModule } from './form-routing.module';
import {WizardComponent} from './wizard/wizard.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {RegisterFormComponent} from './edit/form.component';
import {BaseFormComponent} from './base-form.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    WizardComponent,
    BaseFormComponent
  ],
  imports: [
    ProjectShareModule,
    FormRoutingModule
  ]
})
export class FormModule { }
