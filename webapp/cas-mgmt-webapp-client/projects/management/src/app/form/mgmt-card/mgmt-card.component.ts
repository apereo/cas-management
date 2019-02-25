import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './mgmt-card.component.html'
})
export class MgmtCardComponent implements OnInit {

  showContent = true;

  @Input()
  title: string;

  @Input()
  collapse = true;

  constructor() { }

  ngOnInit() {
  }

}
