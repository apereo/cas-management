import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {FormRoutingModule} from './form-routing.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ProjectShareModule,
    FormRoutingModule
  ]
})
export class FormModule { }
