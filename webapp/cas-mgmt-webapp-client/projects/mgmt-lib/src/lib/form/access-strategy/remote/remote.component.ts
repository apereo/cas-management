import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {RemoteEndpointServiceAccessStrategy} from '../../../domain/access-strategy';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => RemoteComponent)
  }]
})
export class RemoteComponent extends HasControls implements OnInit {

  @Input()
  data: RemoteEndpointServiceAccessStrategy[];

  endpointUrl: MgmtFormControl;
  responseCodes: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('endpointUrl', this.endpointUrl);
    c.set('responseCodes', this.responseCodes);
    return c;
  }

  ngOnInit() {
    const og: any = this.data[1] ? this.data[1] : {};
    this.endpointUrl = new MgmtFormControl(this.data[0].endpointUrl, og.endpointUrl);
    this.responseCodes = new MgmtFormControl(this.data[0].acceptableResponseCodes, og.acceptableResponseCodes);
  }

}
