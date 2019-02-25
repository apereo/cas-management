import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatChipInputEvent} from '@angular/material';
import {FormDataService} from '../../../form-data.service';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-delegated',
  templateUrl: './delegated.component.html'
})
export class DelegatedComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  delegatedAuthn: string[] = [];

  @ViewChild( MatAutocompleteTrigger )
  autoTrigger: MatAutocompleteTrigger;

  @ViewChild('providerInput')
  providerInput: ElementRef;

  @Input()
  control: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.delegatedAuthn = this.control.value || [];
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.autoTrigger.closePanel();
      this.control.setValue(this.delegatedAuthn);
      this.control.markAsTouched();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(provider: any): void {
    const index = this.delegatedAuthn.indexOf(provider);

    if (index >= 0) {
      this.delegatedAuthn.splice(index, 1);
      this.control.setValue(this.delegatedAuthn);
      this.control.markAsTouched();
    }
  }

  selection(val: MatAutocompleteSelectedEvent) {
    const value =  val.option.value;
    if ((value || '').trim()) {
      this.delegatedAuthn.push(value.trim());
      this.control.setValue(this.delegatedAuthn);
      this.control.markAsTouched();
    }

    if (this.providerInput) {
      this.providerInput.nativeElement.value = '';
    }
  }
}
