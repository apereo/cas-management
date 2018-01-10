export abstract class RegisteredServiceDelegatedAuthenticationPolicy {

}

export class DefaultRegisteredServiceDelegatedAuthenticationPolicy implements RegisteredServiceDelegatedAuthenticationPolicy {
    static cName = 'org.apereo.cas.services.DefaultRegisteredServiceDelegatedAuthenticationPolicy';

    allowedProviders: String[];

    static instanceOf(obj: any): boolean {
        return obj && obj['@class'] === DefaultRegisteredServiceDelegatedAuthenticationPolicy.cName;
    }

    constructor() {
        this['@class'] = DefaultRegisteredServiceDelegatedAuthenticationPolicy.cName;
    }
}
