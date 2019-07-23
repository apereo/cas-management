import {RegexRegisteredService, RegisteredService} from './registered-service';
import {WsFederationClaimsReleasePolicy} from './attribute-release';

export class WSFederationRegisterdService extends RegexRegisteredService {
  static readonly cName = 'org.apereo.cas.ws.idp.services.WSFederationRegisteredService';

  realm: string;
  protocol: string;
  tokenType: string;
  wsdlLocation: string;
  namespace: string;
  addressingNamespace: string;
  policyNamespace: string;
  wsdlService: string;
  wsdlEndpoint: string;
  appliesTo: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === WSFederationRegisterdService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: WSFederationRegisterdService = WSFederationRegisterdService.instanceOf(service)
      ? service as WSFederationRegisterdService : undefined;
    this.realm = (s && s.realm) || null;
    this.protocol = (s && s.protocol) || null;
    this.tokenType = (s && s.tokenType) || null;
    this.wsdlLocation = (s && s.wsdlLocation) || null;
    this.namespace = (s && s.namespace) || null;
    this.addressingNamespace = (s && s.addressingNamespace) || null;
    this.policyNamespace = (s && s.policyNamespace) || null;
    this.wsdlService = (s && s.wsdlService) || null;
    this.wsdlEndpoint = (s && s.wsdlEndpoint) || null;
    this.appliesTo = (s && s.appliesTo) || null;
    this.attributeReleasePolicy = s && s.attributeReleasePolicy && WsFederationClaimsReleasePolicy.instanceOf(s.attributeReleasePolicy)
      ? s.attributeReleasePolicy
      : new WsFederationClaimsReleasePolicy();
    this['@class'] = WSFederationRegisterdService.cName;
  }
}
