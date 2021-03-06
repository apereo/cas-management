import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-groovy-surrogate',
  templateUrl: './groovy-surrogate.component.html'
})
export class GroovySurrogateComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
