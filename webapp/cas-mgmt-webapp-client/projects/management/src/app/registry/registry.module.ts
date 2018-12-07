import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteComponent} from './delete/delete.component';
import {DomainsComponent} from './domains/domains.component';
import {ImportComponent} from './import/import.component';
import {JSONComponent} from './json/json.component';
import {ServicesComponent} from './services/services.component';
import {YamlComponent} from './yaml/yaml.component';
import {SearchComponent} from './search/search.component';
import {ProjectShareModule} from '../project-share/project-share.module';
import {RegistryRoutingModule} from './registry-routing.module';

@NgModule({
  imports: [
    ProjectShareModule,
    RegistryRoutingModule
  ],
  declarations: [
    DeleteComponent,
    DomainsComponent,
    ImportComponent,
    JSONComponent,
    SearchComponent,
    ServicesComponent,
    YamlComponent
  ]

})
export class RegistryModule { }
