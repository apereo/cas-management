import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokensRoutingModule } from './tokens-routing.module';
import { TokensComponent } from './tokens.component';
import {ProjectShareModule} from '../project-share/project-share.module';

@NgModule({
  declarations: [TokensComponent],
  imports: [
    ProjectShareModule,
    TokensRoutingModule
  ]
})
export class TokensModule { }
