import {Component, forwardRef, OnInit} from '@angular/core';
import {
  RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy
} from '../../domain/proxy-policy';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

enum Type {
  REGEX,
  REFUSE
}

@Component({
  selector: 'lib-proxy',
  templateUrl: './proxy.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ProxyComponent)
  }]

})
export class ProxyComponent extends HasControls implements OnInit {

  type: Type;
  TYPE = Type;

  policy: RegexMatchingRegisteredServiceProxyPolicy;
  original: RegexMatchingRegisteredServiceProxyPolicy;

  pattern: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('pattern', this.pattern);
    return c;
  }

  ngOnInit() {
    if (RefuseRegisteredServiceProxyPolicy.instanceOf(this.data.service.proxyPolicy)) {
      this.type = Type.REFUSE;
    } else if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(this.data.service.proxyPolicy)) {
      this.type = Type.REGEX;
      this.policy = this.data.service.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy;
      this.original = this.data.original && this.data.original.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy;
      const og = this.original && this.original.pattern;
      this.pattern = new MgmtFormControl(this.policy.pattern, og);
    }
  }

  changeType() {
    switch (+this.type) {
      case Type.REFUSE :
        this.data.service.proxyPolicy = new RefuseRegisteredServiceProxyPolicy();
        break;
      case Type.REGEX :
        this.data.service.proxyPolicy = new RegexMatchingRegisteredServiceProxyPolicy();
        this.policy = this.data.service.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy;
        const og = this.original && this.original.pattern;
        this.pattern = new MgmtFormControl(this.policy.pattern, og);
        break;
    }

  }

}
