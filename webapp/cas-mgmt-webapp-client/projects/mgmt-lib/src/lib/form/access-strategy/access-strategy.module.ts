import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccessStrategyComponent} from './access-strategy.component';
import {DelegatedComponent} from './delegated/delegated.component';
import {GroovyComponent} from './groovy/groovy.component';
import {GrouperComponent} from './grouper/grouper.component';
import {RemoteComponent} from './remote/remote.component';
import {RequiredComponent} from './required/required.component';
import {SurrogateComponent} from './surrogate/surrogate.component';
import {TimeComponent} from './time/time.component';
import {GroovySurrogateComponent} from './groovy-surrogate/groovy-surrogate.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccessStrategyComponent,
    DelegatedComponent,
    GroovyComponent,
    GrouperComponent,
    RemoteComponent,
    RequiredComponent,
    SurrogateComponent,
    GroovySurrogateComponent,
    TimeComponent
  ],
  exports: [
    AccessStrategyComponent,
    DelegatedComponent,
    GroovyComponent,
    GrouperComponent,
    RemoteComponent,
    RequiredComponent,
    SurrogateComponent,
    GroovySurrogateComponent,
    TimeComponent
  ]
})

export class AccessStrategyModule {}
