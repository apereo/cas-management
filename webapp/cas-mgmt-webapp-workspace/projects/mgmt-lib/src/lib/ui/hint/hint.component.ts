import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Component used to display a hint in Material FieldForm for difference in the fields between versions.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-hint',
  templateUrl: './hint.component.html'
})
export class HintComponent {

  @Input()
  difference: boolean;

  @Output()
  showDiff: EventEmitter<boolean> = new EventEmitter<boolean>();

  diffOn: boolean;

  constructor() {
  }

  /**
   * Handles click on the hint to toggle if the difference is displayed.
   */
  clickDiff() {
    this.diffOn = !this.diffOn;
    this.showDiff.emit(this.diffOn);
  }

}
