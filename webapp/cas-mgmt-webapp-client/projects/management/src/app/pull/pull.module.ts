/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PullComponent} from './pull.component';
import {PullService} from './pull.service';
import {PullResolver} from './pull.resolver';
import {SharedModule} from 'mgmt-lib';
import {MgmtModule} from '../mgmt.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MgmtModule
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
