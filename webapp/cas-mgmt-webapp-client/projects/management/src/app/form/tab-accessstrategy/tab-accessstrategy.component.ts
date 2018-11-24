import {AfterContentInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TabBaseComponent} from '../tab-base';
import {GroovyRegisteredServiceAccessStrategy} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';
import {RegisteredServiceAccessStrategy} from '../../../../../mgmt-lib/src/lib/domain/access-strategy';

@Component({
  selector: 'app-tab-accessstrategy',
  templateUrl: './tab-accessstrategy.component.html'
})
export class TabAccessstrategyComponent extends TabBaseComponent implements OnInit, AfterContentInit {

  groovyAccessStrategy: boolean;

  @ViewChildren(HasControls)
  controls: QueryList<HasControls>;

  accessStrategy: FormGroup;


  ngOnInit() {
    super.ngOnInit();
    this.typeChange();
  }

  ngAfterContentInit() {
    for (let control of this.controls.toArray()) {
      control.getControls().forEach((value, key, map) => this.accessStrategy.addControl(key as string, value));
    }
  }

  typeChange() {
    this.groovyAccessStrategy = GroovyRegisteredServiceAccessStrategy.instanceOf(this.data.service.accessStrategy);
  }

  strategy(): RegisteredServiceAccessStrategy[] {
    return [
      this.data.service.accessStrategy,
      this.data.original && this.data.original.accessStrategy
    ];
  }

  handlers(): String[][] {
    return [
      this.data.service.requiredHandlers,
      this.data.original && this.data.original.requiredHandlers
    ];
  }
}
