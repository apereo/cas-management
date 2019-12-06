import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccessStrategyComponent} from './access-strategy.component';
import {GroovyComponent} from './groovy/groovy.component';
import {GrouperComponent} from './grouper/grouper.component';
import {RemoteComponent} from './remote/remote.component';
import {RequiredComponent} from './required/required.component';
import {SurrogateComponent} from './surrogate/surrogate.component';
import {TimeComponent} from './time/time.component';
import {GroovySurrogateComponent} from './groovy-surrogate/groovy-surrogate.component';
import {SharedLibModule} from 'shared-lib';
import {AttributesModule} from '../attributes/attributes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttributesModule,
    SharedLibModule
  ],
  declarations: [
    AccessStrategyComponent,
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
