import {Component, forwardRef, OnInit} from '@angular/core';
import {RemoteEndpointServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';
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

  accessStrategy: RemoteEndpointServiceAccessStrategy;
  original: RemoteEndpointServiceAccessStrategy;
  endpointUrl: MgmtFormControl;
  responseCodes: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy as RemoteEndpointServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as RemoteEndpointServiceAccessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('endpointUrl', this.endpointUrl);
    c.set('responseCodes', this.responseCodes);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.endpointUrl = new MgmtFormControl(this.accessStrategy.endpointUrl, og.endpointUrl);
    this.responseCodes = new MgmtFormControl(this.accessStrategy.acceptableResponseCodes, og.acceptableResponseCodes);
  }

}
