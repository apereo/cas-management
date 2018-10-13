import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css']
})
export class HintComponent implements OnInit {

  @Input()
  difference: boolean;

  @Output()
  showDiff: EventEmitter<boolean> = new EventEmitter<boolean>();

  diffOn: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  clickDiff() {
    this.diffOn = !this.diffOn;
    this.showDiff.emit(this.diffOn);
  }
}

