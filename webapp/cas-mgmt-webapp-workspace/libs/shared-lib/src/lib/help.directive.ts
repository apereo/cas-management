import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[libHelp]'
})

export class HelpDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.innerText = 'help';
    this.el.nativeElement.style.fontSize = 'medium';
  }

}
