/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ChangesComponent} from './changes.component';
import {ChangesResolve} from './changes.resolover';
import {ChangesService} from './changes.service';
import {SharedModule} from '../shared/shared.module';
import {DiffModule} from '../diff/diff.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HttpModule,
    DiffModule
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
