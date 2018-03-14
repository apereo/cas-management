import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DomainsModule} from '../app/domains/domains.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../app/shared/shared.module';
import {RegisterComponent} from './register.component';
import {HeaderComponent} from './header/header.component';
import {FormComponent} from './form/form.component';
import {RegisterRoutingModule} from './register-routing.module';
import {FooterComponent} from '../app/footer/footer.component';
import {Messages} from '../app/messages';
import {FooterService} from '../app/footer/footer.service';
import {FormModule} from '../app/form/form.module';
import {ServiceidComponent} from '../app/form/serviceid/serviceid.component';
import {ServicenameComponent} from '../app/form/servicename/servicename.component';
import {ServicedescComponent} from '../app/form/servicedesc/servicedesc.component';
import {Data} from '../app/form/data';
import {InvalidDomainDirective} from '../app/form/serviceid/invalid-domain.directive';
import {UserService} from '../app/user.service';
import {AppConfigService} from '../app/app-config.service';
import {ContactsComponent} from '../app/form/contacts/contacts.component';
import {MultiauthpaneComponent} from '../app/form/multiauthpane/multiauthpane.component';
import {LogoutComponent} from '../app/form/logout/logout.component';
import {LogouttypeevalComponent} from '../app/form/logouttypeeval/logouttypeeval.component';
import {RegisterService} from './register.servivce';
import {SubmitComponent} from './submit/submit.component';
import {FormService} from '../app/form/form.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FormModule,
    HttpClientModule,
    DomainsModule,
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterComponent,
    HeaderComponent,
    FormComponent,
    SubmitComponent
  ],
  providers: [
    Messages,
    FooterService,
    Data,
    UserService,
    AppConfigService,
    RegisterService,
  ],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
