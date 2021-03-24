import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UiModule} from '@apereo/mgmt-lib';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';

/**
 * Common share module imported by all modules in the application.
 *
 * @author Travis Schmidt
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    UiModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    UiModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule
  ]
})
export class ProjectShareModule { }
