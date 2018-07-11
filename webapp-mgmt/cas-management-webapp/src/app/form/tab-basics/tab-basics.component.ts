import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TabBaseComponent} from '../tab-base';
import {UserProfile} from '../../../domain/user-profile';
import {Data} from '../data';
import {UserService} from '../../user.service';
import {GroovyRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';

@Component({
  selector: 'app-tab-basics',
  templateUrl: './tab-basics.component.html'
})
export class TabBasicsComponent extends TabBaseComponent implements OnInit {

  groovyAccessStrategy: boolean;

  ngOnInit() {
    super.ngOnInit();
    this.groovyAccessStrategy = GroovyRegisteredServiceAccessStrategy.instanceOf(this.data.service.accessStrategy);
  }

  constructor(public data: Data,
              public changeRef: ChangeDetectorRef,
              public userService: UserService) {
    super(data, changeRef);
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
