/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {CommitHistoryComponent} from './commit-history.component';
import {CommitHistoryService} from './commit-history.service';
import {CommitHistoryResolve} from './commit-history.resolover';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
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

