import {NgModule} from '@angular/core';
import {DeleteComponent} from './delete/delete.component';
import {CommonModule} from '@angular/common';
import {UiModule} from '@apereo/mgmt-lib/src/lib/ui';
import {FlexModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {SearchComponent} from './search/search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips';
import {ServicesComponent} from './services/services.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DomainsComponent} from './domains/domains.component';
import {OauthComponent} from './oauth/oauth.component';
import {SamlComponent} from './saml/saml.component';
import {YamlComponent} from './yaml/yaml.component';
import {JSONComponent} from './json/json.component';
import {MetadataEditorComponent} from './metadata/metadata.component';
import {ImportComponent} from './import/import.component';
import {RegistryRoutingModule} from './registry-routing.module';
import { WsFedComponent } from './wsfed/wsfed.component';
import { MatCardModule } from '@angular/material/card';

/**
 * Registry Module.
 */
@NgModule({
  declarations: [
    DeleteComponent,
    SearchComponent,
    ServicesComponent,
    DomainsComponent,
    OauthComponent,
    SamlComponent,
    YamlComponent,
    JSONComponent,
    MetadataEditorComponent,
    ImportComponent,
    WsFedComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FlexModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatChipsModule,
    DragDropModule,
    RegistryRoutingModule
  ],
  exports: [
    DeleteComponent,
    SearchComponent,
    ServicesComponent,
    DomainsComponent,
    OauthComponent,
    SamlComponent,
    YamlComponent,
    JSONComponent,
    MetadataEditorComponent,
    ImportComponent,
    WsFedComponent
  ]
}) export class RegistryModule {}
