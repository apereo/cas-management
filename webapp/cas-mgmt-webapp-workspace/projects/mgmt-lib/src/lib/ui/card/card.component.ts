import {Component, Input} from '@angular/core';

/**
 * Component that shows content in a collapsable Material Card.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  showContent = true;

  @Input()
  flex: string = '0 1 550px';

  @Input()
  heading: string;

  @Input()
  collapse = true;

  constructor() { }

}
