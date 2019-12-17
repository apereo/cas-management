/**
 * Created by tsschmi on 2/28/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {CdkTableModule} from '@angular/cdk/table';
import {PaginatorComponent} from './paginator/paginator.component';
import {FooterComponent} from './footer/footer.component';
import {UnknownComponent} from './unknown/unknown.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {CardComponent} from './card/card.component';
import {LibNavigationComponent} from './navigation/navigation.component';
import {RouterModule} from '@angular/router';
import {TimeoutComponent} from './timeout/timeout.component';
import {TrackerComponent} from './tracker/tracker.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServiceInterceptor} from './interceptor';
import {HintComponent} from './hint/hint.component';
import {InputComponent} from './input/input.component';
import {HelpDirective} from './help.directive';
import {ViewComponent} from './view/view.component';
import {EditorComponent} from './editor.component';
import {EditorOptionsComponent} from './editor-options/editor-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    PaginatorComponent,
    FooterComponent,
    UnknownComponent,
    SpinnerComponent,
    CardComponent,
    TimeoutComponent,
    TrackerComponent,
    LibNavigationComponent,
    HintComponent,
    InputComponent,
    HelpDirective,
    ViewComponent,
    EditorComponent,
    EditorOptionsComponent
  ],
  entryComponents: [
    SpinnerComponent,
    TimeoutComponent,
    ViewComponent,
    EditorOptionsComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true}
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
    PaginatorComponent,
    FooterComponent,
    UnknownComponent,
    SpinnerComponent,
    CardComponent,
    LibNavigationComponent,
    TimeoutComponent,
    TrackerComponent,
    HintComponent,
    InputComponent,
    HelpDirective,
    ViewComponent,
    EditorComponent,
    EditorOptionsComponent
  ]
})
export class SharedLibModule {}
