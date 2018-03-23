import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DomainsModule} from '../app/domains/domains.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../app/shared/shared.module';
import {RegisterComponent} from './register.component';
import {HeaderComponent} from './header/header.component';
import {RegisterFormComponent} from './form/form.component';
import {RegisterRoutingModule} from './register-routing.module';
import {Messages} from '../app/messages';
import {FooterService} from '../app/footer/footer.service';
import {FormModule} from '../app/form/form.module';
import {Data} from '../app/form/data';
import {UserService} from '../app/user.service';
import {AppConfigService} from '../app/app-config.service';
import {RegisterService} from './register.servivce';
import {SubmitComponent} from './submit/submit.component';
import {ServicesComponent} from './services/services.component';
import {ServicesResolve} from './services/services.resolover';
import {ServiceViewService} from './services/service.service';
import {WizzardComponent} from './wizzard/wizzard.component';
import {RegisterFormResolve} from './form/form.resolve';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    HttpClientModule,
    DomainsModule,
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterComponent,
    HeaderComponent,
    RegisterFormComponent,
    WizzardComponent,
    SubmitComponent,
    ServicesComponent
  ],
  providers: [
    Messages,
    FooterService,
    Data,
    UserService,
    AppConfigService,
    RegisterService,
    ServiceViewService,
    ServicesResolve,
    RegisterFormResolve
  ],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
