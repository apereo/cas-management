/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CommitHistoryComponent} from './commit-history.component';
import {CommitHistoryService} from './commit-history.service';
import {CommitHistoryResolve} from './commit-history.resolver';
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
    CommitHistoryComponent,
  ],
  providers: [
    CommitHistoryResolve,
    CommitHistoryService
  ]
})

export class CommitHistoryModule {}

