import {Component, forwardRef, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => SamlMetadataComponent)
  }]
})
export class SamlMetadataComponent extends HasControls implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;
  location: MgmtFormControl;
  maxValidity: MgmtFormControl;
  signatureLocation: MgmtFormControl;
  expirationDuration: MgmtFormControl;
  criteriaPattern: MgmtFormControl;
  criteriaDirection: MgmtFormControl;
  criteriaRoles: MgmtFormControl;
  criteriaRemoveEmptyEntitiesDescriptors: MgmtFormControl;
  criteriaRemoveRolelessEntityDescriptors: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('location', this.location);
    c.set('maxValidity', this.maxValidity);
    c.set('signatureLocation', this.signatureLocation);
    c.set('expirationDuration', this.expirationDuration);
    c.set('criteriaPattern', this.criteriaPattern);
    c.set('criteriaDirection', this.criteriaDirection);
    c.set('criteriaRoles', this.criteriaRoles);
    c.set('criteriaRemoveEmptyEntitiesDescriptors', this.criteriaRemoveEmptyEntitiesDescriptors);
    c.set('criteriaRemoveRolelessEntityDescriptors', this.criteriaRemoveRolelessEntityDescriptors);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.location = new MgmtFormControl(this.service.metadataLocation, og.metadataLocation);
    this.maxValidity = new MgmtFormControl(this.service.metadataMaxValidity, og.metadataMaxValidity);
    this.signatureLocation = new MgmtFormControl(this.service.metadataSignatureLocation, og.metadataSignatureLocation);
    this.expirationDuration = new MgmtFormControl(this.service.metadataExpirationDuration, og.metadataExpirationDuration);
    this.criteriaPattern = new MgmtFormControl(this.service.metadataCriteriaPattern, og.metadataCriteriaPattern);
    this.criteriaRoles = new MgmtFormControl(this.service.metadataCriteriaRoles, og.metadataCriteriaRoles);
    this.criteriaDirection = new MgmtFormControl(this.service.metadataCriteriaDirection, og.metadataCriteriaDirection);
    this.criteriaRemoveEmptyEntitiesDescriptors = new MgmtFormControl(this.service.metadataCriteriaRemoveEmptyEntitiesDescriptors,
      og.metadataCriteriaRemoveEmptyEntitiesDescriptors);
    this.criteriaRemoveRolelessEntityDescriptors = new MgmtFormControl(this.service.metadataCriteriaRemoveRolelessEntityDescriptors,
      og.metadataCriteriaRemoveRolelessEntityDescriptors);
  }

}
