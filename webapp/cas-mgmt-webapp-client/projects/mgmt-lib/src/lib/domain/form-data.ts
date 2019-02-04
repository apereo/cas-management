export class FormData {
    availableAttributes: string[] = [];
    registeredServiceProperties: PropertyEnum[];
    grouperFields: string[];
    remoteCodes: string[];
    timeUnits: string[];
    mergingStrategies: string[];
    logoutTypes: string[];
    serviceTypes: PropertyEnum[];
    samlRoles: string[];
    samlDirections: string[];
    samlAttributeNameFormats: string[];
    samlCredentialTypes: string[];
    wsFederationClaims: string[];
    mfaProviders: PropertyEnum[];
    mfaFailureModes: string[];
    oidcScopes: PropertyEnum[];
    encodingAlgOptions: string[];
    encryptAlgOptions: string[];
    oidcSubjectTypes: PropertyEnum[];
    canonicalizationModes: string[];
    delegatedAuthnProviders: string[];
    oauth20GrantTypes: string[];
    oauth20ResponseTypes: string[];
}

export interface PropertyEnum {
    propertyName: string;
    defaultValue: string;
}
