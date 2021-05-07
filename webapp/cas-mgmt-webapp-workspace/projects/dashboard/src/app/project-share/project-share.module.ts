import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UiModule} from '@apereo/mgmt-lib/src';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

/**
 * Module to load common modules used by other modules in the app.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UiModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    UiModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule
  ]
})
export class ProjectShareModule { }
