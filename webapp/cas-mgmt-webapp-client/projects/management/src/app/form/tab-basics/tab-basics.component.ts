import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList, ViewChildren,
} from '@angular/core';
import {TabBaseComponent} from '../tab-base';
import {DataRecord, GroovyRegisteredServiceAccessStrategy, UserProfile, HasControls, AbstractRegisteredService} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tab-basics',
  templateUrl: './tab-basics.component.html'
})
export class TabBasicsComponent extends TabBaseComponent implements OnInit, AfterContentInit {

  groovyAccessStrategy: boolean;

  basics: FormGroup;

  @ViewChildren(HasControls)
  controls: QueryList<HasControls>;

  ngOnInit() {
    super.ngOnInit();
    this.groovyAccessStrategy = GroovyRegisteredServiceAccessStrategy.instanceOf(this.data.service.accessStrategy);
  }

  ngAfterContentInit() {
    console.log(this.controls);
    for (let control of this.controls.toArray()) {
      control.getControls().forEach((value, key, map) => this.basics.addControl(key as string, value));
    }
  }

  constructor(public data: DataRecord,
              public changeRef: ChangeDetectorRef) {
    super(data, changeRef);
    this.basics = new FormGroup({});
  }

  enabled(): boolean[] {
    return [
      this.data.service.accessStrategy.enabled,
      this.data.original && this.data.original.accessStrategy.enabled
    ]
  }

  serviceType(): AbstractRegisteredService {
    return this.data.service;
  }

  serviceId(): String[] {
    return [
      this.data.service.serviceId,
      this.data.original && this.data.original.serviceId
    ]
  }

  serviceName(): String[] {
    return [
      this.data.service.name,
      this.data.original && this.data.original.name
    ]
  }

  description(): String[] {
    return [
      this.data.service.description,
      this.data.original && this.data.original.description
    ]
  }

  theme(): String[] {
    return [
      this.data.service.theme,
      this.data.original && this.data.original.theme
    ]
  }

  logo(): String[] {
    return [
      this.data.service.logo,
      this.data.original && this.data.original.logo
    ]
  }

  informationUrl(): String[] {
    return [
      this.data.service.informationUrl,
      this.data.original && this.data.original.informationUrl
    ]
  }

  privacyUrl(): String[] {
    return [
      this.data.service.privacyUrl,
      this.data.original && this.data.original.privacyUrl
    ]
  }

  validateDomain = function(user: UserProfile) {
    return function (service: string): boolean {
      const domainPattern = new RegExp('^\\^?https?\\??://(.*?)(?:[(]?[:/]|$)');

      if (user.administrator || user.permissions.indexOf('*') > -1) {
        return true;
      }
      try {
        const domain = domainPattern.exec(service);
        if (domain != null) {
          return user.permissions.indexOf(domain[1]) > -1;
        }
      } catch (e) {
        console.log('Failed Domain parse');
      }
      return false;
    };
  }
}
