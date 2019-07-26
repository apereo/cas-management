import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  showContent = true;

  @Input()
  heading: string;

  @Input()
  collapse = true;

  constructor() { }

  ngOnInit() {
  }

}
