import {Component, OnInit} from '@angular/core';
import {TabBaseComponent} from '../tab-base';
import {GroovyRegisteredServiceAccessStrategy} from 'mgmt-lib';

@Component({
  selector: 'app-tab-accessstrategy',
  templateUrl: './tab-accessstrategy.component.html'
})
export class TabAccessstrategyComponent extends TabBaseComponent implements OnInit {

  groovyAccessStrategy: boolean;

  ngOnInit() {
    super.ngOnInit();
    this.typeChange();
  }

  typeChange() {
    this.groovyAccessStrategy = GroovyRegisteredServiceAccessStrategy.instanceOf(this.data.service.accessStrategy);
  }
}
