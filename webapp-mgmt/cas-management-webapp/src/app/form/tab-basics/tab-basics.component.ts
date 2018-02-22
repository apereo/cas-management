import {Component, OnInit} from '@angular/core';
import {TabBaseComponent} from '../tab-base';
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
