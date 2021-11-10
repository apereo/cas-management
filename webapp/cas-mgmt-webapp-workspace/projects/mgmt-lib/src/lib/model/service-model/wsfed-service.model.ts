import {RegexRegisteredService, RegisteredService} from './registered-service.model';
import {WsFederationClaimsReleasePolicy} from './attribute-release';

/**
 * Data class for WSFederationRegisteredService.
 */
export class WSFederationRegisteredService extends RegexRegisteredService {
  static cName = 'org.apereo.cas.ws.idp.services.WSFederationRegisteredService';

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

  /**
   * Returns true if the passed object is an instance of WSFederationRegisteredService.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === WSFederationRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: WSFederationRegisteredService = WSFederationRegisteredService.instanceOf(service)
      ? service as WSFederationRegisteredService : undefined;
    this.realm = s?.realm;
    this.protocol = s?.protocol;
    this.tokenType = s?.tokenType;
    this.wsdlLocation = s?.wsdlLocation;
    this.namespace = s?.namespace;
    this.addressingNamespace = s?.addressingNamespace;
    this.policyNamespace = s?.policyNamespace;
    this.wsdlService = s?.wsdlService;
    this.wsdlEndpoint = s?.wsdlEndpoint;
    this.appliesTo = s?.appliesTo;
    this.attributeReleasePolicy = s?.attributeReleasePolicy && WsFederationClaimsReleasePolicy.instanceOf(s.attributeReleasePolicy)
      ? s.attributeReleasePolicy
      : new WsFederationClaimsReleasePolicy();

    this['@class'] = WSFederationRegisteredService.cName;
  }
}
