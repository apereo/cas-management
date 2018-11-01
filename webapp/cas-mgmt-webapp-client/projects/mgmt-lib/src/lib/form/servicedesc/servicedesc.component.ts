import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-servicedesc',
  templateUrl: './servicedesc.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ServicedescComponent implements OnInit {


  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
