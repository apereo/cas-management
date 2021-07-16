/**
 * Base data class for RegisteredServiceAccessStrategy.
 */
export abstract class RegisteredServiceAcceptableUsagePolicy {
    enabled: boolean;
    messageCode: string;
    text: string;

    constructor(policy?: RegisteredServiceAcceptableUsagePolicy) {
        this.enabled = policy?.enabled ?? true;
        this.messageCode = policy?.messageCode ?? null;
        this.text = policy?.text ?? null;
    }
}

/**
 * Data class for DefaultRegisteredServiceAccessStrategy.
 */
export class DefaultRegisteredServiceAcceptableUsagePolicy extends RegisteredServiceAcceptableUsagePolicy {
    static cName = 'org.apereo.cas.services.DefaultRegisteredServiceAcceptableUsagePolicy';

    /**
     * Returns true if the passed object is an instance of DefaultRegisteredServiceAccessStrategy.
     *
     * @param obj - object to inspect
     */
    static instanceOf(obj: any): boolean {
        return obj && obj['@class'] === DefaultRegisteredServiceAcceptableUsagePolicy.cName;
    }

    constructor(strat?: RegisteredServiceAcceptableUsagePolicy) {
        super(strat);
        this['@class'] = DefaultRegisteredServiceAcceptableUsagePolicy.cName;
    }
}

export function acceptableUsagePolicy(policy?: any): RegisteredServiceAcceptableUsagePolicy {
    if (!policy || DefaultRegisteredServiceAcceptableUsagePolicy.instanceOf(policy)) {
        return new DefaultRegisteredServiceAcceptableUsagePolicy(policy);
    }
    return policy;
}