import {Component, forwardRef, OnInit} from '@angular/core';
import {FormData} from '../../../domain/form-data';
import {
  CachingPrincipalAttributesRepository,
  DefaultPrincipalAttributesRepository
} from '../../../domain/attribute-repo';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

enum Type {
  DEFAULT,
  CACHING,
}

@Component({
  selector: 'lib-attribute-release-principal-repo',
  templateUrl: './principal-repo.component.html',
  styleUrls: ['./principal-repo.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => PrincipalRepoComponent)
  }]
})
export class PrincipalRepoComponent extends HasControls implements OnInit {
  formData: FormData;
  type: Type;
  TYPE = Type;

  repo: any;
  original: any;
  timeUnit: MgmtFormControl;
  expiration: MgmtFormControl;
  mergingStrategy: MgmtFormControl;


  constructor(public data: DataRecord) {
    super();
    this.formData = data.formData;
    this.repo = data.service.attributeReleasePolicy.principalAttributesRepository;
    this.original = data.original &&
                    data.original.attributeReleasePolicy &&
                    data.original.attributeReleasePolicy.principalAttributesRepository;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('timeUnit', this.timeUnit);
    c.set('expiration', this.expiration);
    c.set('mergingStrategy', this.mergingStrategy);
    return c;
  }

  ngOnInit() {
    if (DefaultPrincipalAttributesRepository
        .instanceOf(this.data.service.attributeReleasePolicy.principalAttributesRepository)) {
      this.type = Type.DEFAULT;
    } else if (CachingPrincipalAttributesRepository
        .instanceOf(this.data.service.attributeReleasePolicy.principalAttributesRepository)) {
      this.type = Type.CACHING;
    }
    const og: any = this.original ? this.original : {};
    this.timeUnit = new MgmtFormControl(this.repo.timeUnit, og.timeUnit);
    this.expiration = new MgmtFormControl(this.repo.expiration, og.expiration);
    this.mergingStrategy = new MgmtFormControl(this.repo.mergingStrategy, og.mergingStrategy);
  }

  changeType() {
    switch (+this.type) {
      case Type.DEFAULT :
        this.data.service.attributeReleasePolicy.principalAttributesRepository =
          new DefaultPrincipalAttributesRepository();
        this.repo = this.data.service.attributeReleasePolicy.principalAttributesRepository;
        break;
      case Type.CACHING :
        this.data.service.attributeReleasePolicy.principalAttributesRepository =
          new CachingPrincipalAttributesRepository();
        this.repo = this.data.service.attributeReleasePolicy.principalAttributesRepository;
        break;
    }
  }

}
