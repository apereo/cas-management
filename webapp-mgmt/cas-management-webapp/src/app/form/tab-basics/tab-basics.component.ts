import {ApplicationRef, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {TabBaseComponent} from '../tab-base';
import {Subscription} from 'rxjs/Subscription';
import {UserProfile} from '../../../domain/user-profile';
import {Data} from '../data';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-tab-basics',
  templateUrl: './tab-basics.component.html'
})
export class TabBasicsComponent extends TabBaseComponent  {

  constructor(public data: Data,
              public changeRef: ChangeDetectorRef,
              public userService: UserService) {
    super(data, changeRef);
  }

  validateDomain = function(user: UserProfile) {
    return function (service: string): boolean {
      const domainPattern = new RegExp('^\\^?https?\\??://([^:/]+)');

      if (user.administrator || user.permissions.indexOf("*") > -1) {
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
