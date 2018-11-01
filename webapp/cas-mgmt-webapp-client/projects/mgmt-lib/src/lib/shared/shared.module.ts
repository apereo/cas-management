/**
 * Created by tsschmi on 2/28/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
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
import {AttributemappingComponent} from '../form/attributemapping/attributemapping.component';
import {PaginatorComponent} from '../paginator/paginator.component';
import {FooterComponent} from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    MatSlideToggleModule
  ],
  declarations: [
    InputComponent,
    HintComponent,
    HelpDirective,
    AttributemappingComponent,
    PaginatorComponent,
    FooterComponent
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
    AttributemappingComponent,
    PaginatorComponent,
    FooterComponent
  ]
})
export class SharedModule {}
