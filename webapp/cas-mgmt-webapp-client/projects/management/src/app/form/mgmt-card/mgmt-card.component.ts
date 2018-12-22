import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './mgmt-card.component.html',
  styleUrls: ['./mgmt-card.component.css']
})
export class MgmtCardComponent implements OnInit {

  showContent = true;

  @Input()
  title: string;

  @Input()
  collapse: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
