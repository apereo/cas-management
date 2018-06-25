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
  MatPaginatorModule, MatProgressSpinnerModule, MatBadgeModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {ControlsComponent} from '../controls/controls.component';
import {ControlsService} from '../controls/controls.service';
import {EditorComponent} from '../editor.component';
import {CommitComponent} from '../commit/commit.component';
import {PublishComponent} from '../publish/publish.component';
import {FooterComponent} from '../footer/footer.component';
import {PaginatorComponent} from '../paginator/paginator.component';
import {TimeoutComponent} from '../timeout/timeout.component';

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
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [
    EditorComponent,
    ControlsComponent,
    CommitComponent,
    PublishComponent,
    FooterComponent,
    PaginatorComponent,
    TimeoutComponent
  ],
  entryComponents: [
    CommitComponent,
    PublishComponent,
    TimeoutComponent
  ],
  providers: [
    ControlsService
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
    EditorComponent,
    ControlsComponent,
    CommitComponent,
    FooterComponent,
    PaginatorComponent,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class SharedModule {}
