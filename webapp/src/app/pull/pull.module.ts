/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PullComponent} from './pull.component';
import {PullService} from './pull.service';
import {SharedModule} from '../shared/shared.module';
import {PullResolver} from './pull.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    PullComponent,
  ],
  providers: [
    PullService,
    PullResolver
  ]
})

export class PullModule {}
