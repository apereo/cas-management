import {RegexRegisteredService, RegisteredService} from './registered-service';

export class WSFederationRegisterdService extends RegexRegisteredService {
  static readonly cName = 'org.apereo.cas.ws.idp.services.WSFederationRegisteredService';

  realm: String;
  protocol: String;
  tokenType: String;
  wsdlLocation: String;
  namespace: String;
  addressingNamespace: String;
  policyNamespace: String;
  wsdlService: String;
  wsdlEndpoint: String;
  appliesTo: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === WSFederationRegisterdService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: WSFederationRegisterdService = service as WSFederationRegisterdService;
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
    this['@class'] = WSFederationRegisterdService.cName;
  }
}
