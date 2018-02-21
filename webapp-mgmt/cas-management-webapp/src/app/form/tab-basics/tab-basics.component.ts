import {ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {TabBaseComponent} from '../tab-base';
import {Subscription} from 'rxjs/Subscription';
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

}
