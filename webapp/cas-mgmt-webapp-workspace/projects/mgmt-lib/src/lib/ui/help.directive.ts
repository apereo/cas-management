import {Directive, ElementRef, OnInit} from '@angular/core';

/**
 * Directive for displaying the help icon for an input.
 *
 * @author Travis Schmidt
 */
@Directive({
  selector: '[libHelp]'
})

export class HelpDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  /**
   * Sets the text for the icon to display and the font size to use.
   */
  ngOnInit() {
    this.el.nativeElement.innerText = 'help';
    this.el.nativeElement.style.fontSize = 'medium';
  }

}
