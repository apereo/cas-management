/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { HistoryResolve } from './history.resolover';
import { HistoryService } from './history.service';
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
    HistoryComponent,
  ],
  providers: [
    HistoryResolve,
    HistoryService
  ]
})

export class HistoryModule {}

