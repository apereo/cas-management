import {Component, forwardRef, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-nameid',
  templateUrl: './nameid.component.html',
  styleUrls: ['./nameid.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => SamlNameidComponent)
  }]
})
export class SamlNameidComponent extends HasControls implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;
  requiredNameIdFormat: MgmtFormControl;
  serviceProviderNameIdQualifier: MgmtFormControl;
  nameIdQualifier: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('requiredNameIdFormat', this.requiredNameIdFormat);
    c.set('serviceProviderNameIdQualifier', this.serviceProviderNameIdQualifier);
    c.set('nameIdQualifier', this.nameIdQualifier);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.requiredNameIdFormat = new MgmtFormControl(this.service.requiredNameIdFormat, og.requiredNameIdFormat);
    this.serviceProviderNameIdQualifier = new MgmtFormControl(this.service.serviceProviderNameIdQualifier, og.serviceProviderNameIdQualifier);
    this.nameIdQualifier = new MgmtFormControl(this.service.nameIdQualifier, og.nameIdQualifier);
  }

}
