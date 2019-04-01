import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './mgmt-card.component.html'
})
export class MgmtCardComponent implements OnInit {

  showContent = true;

  @Input()
  heading: string;

  @Input()
  collapse = true;

  constructor() { }

  ngOnInit() {
  }

}
