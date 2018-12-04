export class FormData {
    availableAttributes: String[] = [];
    registeredServiceProperties: PropertyEnum[];
    grouperFields: String[];
    remoteCodes: String[];
    timeUnits: String[];
    mergingStrategies: String[];
    logoutTypes: String[];
    serviceTypes: PropertyEnum[];
    samlRoles: String[];
    samlDirections: String[];
    samlAttributeNameFormats: String[];
    samlCredentialTypes: String[];
    wsFederationClaims: String[];
    mfaProviders: PropertyEnum[];
    mfaFailureModes: String[];
    oidcScopes: PropertyEnum[];
    encodingAlgOptions: String[];
    encryptAlgOptions: String[];
    oidcSubjectTypes: PropertyEnum[];
    canonicalizationModes: String[];
    delegatedAuthnProviders: String[];
}

export interface PropertyEnum {
    propertyName: String;
    defaultValue: String;
}
