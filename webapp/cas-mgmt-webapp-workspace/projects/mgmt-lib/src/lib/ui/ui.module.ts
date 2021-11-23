import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card/card.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {DateInputComponent} from './date-input/date-input.component';
import {EditorComponent} from './editor.component';
import {EditorOptionsComponent} from './editor-options/editor-options.component';
import {FooterComponent} from './footer/footer.component';
import {HintComponent} from './hint/hint.component';
import {InputComponent} from './input/input.component';
import {LibNavigationComponent} from './navigation/navigation.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {SelectInputComponent} from './select-input/select-input.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {TextInputComponent} from './text-input/text-input.component';
import {TimeoutComponent} from './timeout/timeout.component';
import {TrackerComponent} from './tracker/tracker.component';
import {UnknownComponent} from './unknown/unknown.component';
import {ViewComponent} from './view/view.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServiceInterceptor} from './interceptor';
import {HelpDirective} from './help.directive';
import {OAuthAddComponent} from './oauth-add/oauth-add.component';
import {SamlAddComponent} from './saml-add/saml-add.component';
import {ControlsComponent} from './controls/controls.component';
import {CommitComponent} from './commit/commit.component';
import {PublishComponent} from './publish/publish.component';
import {RevertComponent} from './revert/revert.component';
import {AcceptComponent} from './accept/accept.component';
import {RejectComponent} from './reject/reject.component';
import { ChipAutocompleteComponent, MatChipAutocompleteTrigger } from './chip-autocomplete/chip-autocomplete.component';
import { PreviewDialog } from './preview/preview-dialog.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { CurrentUserDialog } from './current-user/current-user-dialog.component';


/**
 * UI Module.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
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
    MatProgressBarModule,
    FlexLayoutModule
  ],
  declarations: [
    AcceptComponent,
    CardComponent,
    CheckboxComponent,
    CommitComponent,
    ControlsComponent,
    DateInputComponent,
    EditorComponent,
    EditorOptionsComponent,
    FooterComponent,
    HelpDirective,
    HintComponent,
    InputComponent,
    LibNavigationComponent,
    PaginatorComponent,
    PublishComponent,
    RejectComponent,
    RevertComponent,
    SelectInputComponent,
    ChipAutocompleteComponent,
    SpinnerComponent,
    TextInputComponent,
    TimeoutComponent,
    TrackerComponent,
    UnknownComponent,
    ViewComponent,
    OAuthAddComponent,
    SamlAddComponent,
    MatChipAutocompleteTrigger,
    PreviewDialog,
    CurrentUserComponent,
    CurrentUserDialog
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true}
  ],
  exports: [
    AcceptComponent,
    CardComponent,
    CheckboxComponent,
    CommitComponent,
    ControlsComponent,
    DateInputComponent,
    EditorComponent,
    EditorOptionsComponent,
    FooterComponent,
    HelpDirective,
    HintComponent,
    InputComponent,
    LibNavigationComponent,
    PaginatorComponent,
    PublishComponent,
    RejectComponent,
    RevertComponent,
    SelectInputComponent,
    ChipAutocompleteComponent,
    SpinnerComponent,
    TextInputComponent,
    TimeoutComponent,
    TrackerComponent,
    UnknownComponent,
    ViewComponent,
    OAuthAddComponent,
    SamlAddComponent,
    MatChipAutocompleteTrigger,
    PreviewDialog,
    CurrentUserComponent,
    CurrentUserDialog
  ]
})
export class UiModule { }
