import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AddContactComponent} from './add-contact/add-contact.component';
import {ControlsComponent} from './controls/controls.component';
import {DeleteComponent} from './delete/delete.component';
import {SubmitComponent} from './submit/submit.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UiModule} from '@apereo/mgmt-lib/src';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';

/**
 * Share module for common modules and components for app modules.
 *
 * @author Travis Schmidt
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    UiModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  declarations: [
    AddContactComponent,
    ControlsComponent,
    DeleteComponent,
    SubmitComponent
  ],
  entryComponents: [
    AddContactComponent,
    DeleteComponent,
    SubmitComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    UiModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatBadgeModule,
    AddContactComponent,
    ControlsComponent,
    DeleteComponent,
    SubmitComponent
  ]
})
export class ProjectShareModule { }
