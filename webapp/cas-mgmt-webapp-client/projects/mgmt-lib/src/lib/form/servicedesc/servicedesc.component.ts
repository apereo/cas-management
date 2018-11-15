import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-servicedesc',
  templateUrl: './servicedesc.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ServicedescComponent implements OnInit {

  description: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.description = new MgmtFormControl(this.data.service.description,
                                           this.data.original.description);
  }

}
