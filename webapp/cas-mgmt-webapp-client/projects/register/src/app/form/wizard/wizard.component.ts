import {Component, ViewChild} from '@angular/core';
import {BaseFormComponent} from '../base-form.component';
import {finalize} from 'rxjs/operators';
import {MatStepper} from '@angular/material';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class WizardComponent extends BaseFormComponent {

  @ViewChild(MatStepper)
  stepper: MatStepper;

  saveInternal() {
    this.spinner.start('Submit new service');
    this.registerService.submitService(this.data.service)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit());
  }

  showErrors() {
    if (this.form.get('basics').invalid) {
      this.stepper.selectedIndex = 0;
    } else if (this.form.get('contacts').invalid) {
      this.stepper.selectedIndex = 1;
    } else if (this.form.get('advanced').invalid) {
      this.stepper.selectedIndex = 2;
    }
  }
}
