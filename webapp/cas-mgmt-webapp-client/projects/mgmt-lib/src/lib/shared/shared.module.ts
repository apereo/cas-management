/**
 * Created by tsschmi on 2/28/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  MatSlideToggleModule, MatProgressBarModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {InputComponent} from '../form/input/input.component';
import {HintComponent} from '../form/hint/hint.component';
import {HelpDirective} from '../form/help.directive';
import {PaginatorComponent} from '../paginator/paginator.component';
import {FooterComponent} from '../footer/footer.component';
import {UnknownComponent} from '../unknown/unknown.component';
import {AttributesComponent} from '../form/attributes/attributes.component';
import {SpinnerComponent} from '../spinner/spinner.component';

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
    MatProgressBarModule
  ],
  declarations: [
    InputComponent,
    HintComponent,
    HelpDirective,
    AttributesComponent,
    PaginatorComponent,
    FooterComponent,
    UnknownComponent,
    SpinnerComponent
  ],
  entryComponents: [
    SpinnerComponent
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
    MatProgressBarModule,
    HintComponent,
    InputComponent,
    HelpDirective,
    AttributesComponent,
    PaginatorComponent,
    FooterComponent,
    UnknownComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
