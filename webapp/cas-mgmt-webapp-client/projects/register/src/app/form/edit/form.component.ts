import {Component, ViewChild} from '@angular/core';
import {BaseFormComponent} from '../base-form.component';
import {finalize} from 'rxjs/operators';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-register-form',
  templateUrl: './form.component.html'
})
export class RegisterFormComponent extends BaseFormComponent {

  @ViewChild(MatTabGroup, {static: true})
  tabs: MatTabGroup;

  saveInternal() {
    this.spinner.start();
    this.registerService.saveService(this.data.service, this.route.snapshot.params['id'])
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit());
  }

  showErrors() {
    if (this.form.get('basics').invalid) {
      this.tabs.selectedIndex = 0;
    } else if (this.form.get('contacts').invalid) {
      this.tabs.selectedIndex = 1;
    } else if (this.form.get('advanced').invalid) {
      this.tabs.selectedIndex = 2;
    }
  }
}
