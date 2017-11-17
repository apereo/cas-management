/**
 * Created by tschmidt on 2/23/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomainsComponent } from './domains.component';
import { DomainService } from './domain.service';
import { SharedModule } from '../shared/shared.module';

@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    DomainsComponent
  ],
  providers: [
    DomainService
  ],
  exports: [
    DomainsComponent
  ]
})

export class DomainsModule {}
