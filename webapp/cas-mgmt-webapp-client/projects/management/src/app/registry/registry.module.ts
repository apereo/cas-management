import { NgModule } from '@angular/core';

import { RegistryRoutingModule } from './registry-routing.module';
import {DeleteComponent} from './delete/delete.component';
import {DomainsComponent} from './domains/domains.component';
import {ImportComponent} from './import/import.component';
import {JSONComponent} from './json/json.component';
import {SearchComponent} from './search/search.component';
import {YamlComponent} from './yaml/yaml.component';
import {ProjectShareModule} from '@app/project-share';
import {ServicesComponent} from './services/services.component';

@NgModule({
  declarations: [
    DeleteComponent,
    DomainsComponent,
    ImportComponent,
    JSONComponent,
    SearchComponent,
    ServicesComponent,
    YamlComponent
  ],
  entryComponents: [
    DeleteComponent
  ],
  imports: [
    ProjectShareModule,
    RegistryRoutingModule
  ]
})
export class RegistryModule { }
