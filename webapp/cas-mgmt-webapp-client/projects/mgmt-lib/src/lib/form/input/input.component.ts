import {AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList} from '@angular/core';
import {MatFormField} from '@angular/material';
import {HintComponent} from '../hint/hint.component';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterContentInit {

  @ContentChildren(HintComponent, {descendants: true})
  hints: QueryList<HintComponent>;

  @ContentChildren(MatFormField)
  temp: any;

  constructor() { }

  ngAfterContentInit() {
    this.hints.first.difference = this.difference();
    this.hints.first.showDiff.subscribe(d => this.show(d))
  }

}
