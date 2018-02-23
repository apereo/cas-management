import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {InputComponent} from './input/input.component';
import {HintComponent} from './hint/hint.component';
import {HelpDirective} from './help.directive';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    InputComponent,
    HintComponent,
    HelpDirective
  ],
  exports: [
    InputComponent,
    HintComponent,
    HelpDirective
  ]
})

export class FormSharedModule {}
