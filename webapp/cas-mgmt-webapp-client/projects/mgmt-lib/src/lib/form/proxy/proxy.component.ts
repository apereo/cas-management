import {Component, OnInit} from '@angular/core';
import {
  RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy
} from '../../domain/proxy-policy';
import {DataRecord} from '../data';

enum Type {
  REGEX,
  REFUSE
}

@Component({
  selector: 'lib-proxy',
  templateUrl: './proxy.component.html'
})
export class ProxyComponent implements OnInit {

  type: Type;
  TYPE = Type;

  policy: RegexMatchingRegisteredServiceProxyPolicy;
  original: RegexMatchingRegisteredServiceProxyPolicy;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    if (RefuseRegisteredServiceProxyPolicy.instanceOf(this.data.service.proxyPolicy)) {
      this.type = Type.REFUSE;
    } else if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(this.data.service.proxyPolicy)) {
      this.type = Type.REGEX;
      this.policy = this.data.service.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy;
      this.original = this.data.original && this.data.original.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy;
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
        break;
    }

  }

}
