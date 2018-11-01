/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ChangesComponent} from './changes.component';
import {ChangesResolve} from './changes.resolover';
import {ChangesService} from './changes.service';
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
    ChangesComponent
  ],
  providers: [
    ChangesResolve,
    ChangesService
  ]
})

export class ChangesModule {}
