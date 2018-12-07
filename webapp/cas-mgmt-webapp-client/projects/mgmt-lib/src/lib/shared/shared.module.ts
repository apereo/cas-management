/**
 * Created by tsschmi on 2/28/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import 'hammerjs';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatListModule,
  MatMenuModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatBadgeModule,
  MatSortModule,
  MatSlideToggleModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {InputComponent} from '../form/input/input.component';
import {HintComponent} from '../form/hint/hint.component';
import {HelpDirective} from '../form/help.directive';
import {PaginatorComponent} from '../paginator/paginator.component';
import {FooterComponent} from '../footer/footer.component';
import {UnknownComponent} from '../unknown/unknown.component';
import {AttributesComponent} from '../form/attributes/attributes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    MatRadioModule,
    MatRippleModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatSortModule,
    MatSlideToggleModule,
  ],
  declarations: [
    InputComponent,
    HintComponent,
    HelpDirective,
    AttributesComponent,
    PaginatorComponent,
    FooterComponent,
    UnknownComponent
  ],
  exports: [
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    MatRadioModule,
    MatRippleModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatSortModule,
    MatSlideToggleModule,
    HintComponent,
    InputComponent,
    HelpDirective,
    AttributesComponent,
    PaginatorComponent,
    FooterComponent,
    UnknownComponent
  ]
})
export class SharedModule {}
