export class FormData {
    availableAttributes: string[] = [];
    registeredServiceProperties: Option[];
    grouperFields: string[];
    remoteCodes: string[];
    timeUnits: string[];
    mergingStrategies: string[];
    logoutTypes: string[];
    serviceTypes: Option[];
    samlRoles: string[];
    samlDirections: string[];
    samlAttributeNameFormats: string[];
    samlCredentialTypes: string[];
    wsFederationClaims: string[];
    mfaProviders: Option[];
    mfaFailureModes: string[];
    oidcScopes: Option[];
    encodingAlgOptions: string[];
    encryptAlgOptions: string[];
    oidcSubjectTypes: Option[];
    canonicalizationModes: string[];
    delegatedAuthnProviders: string[];
    oauth20GrantTypes: Option[];
    oauth20ResponseTypes: Option[];
    samlIdpAttributes: string[];
    samlIdpFriendlyNames: Map<string, string>;
}

export interface Option {
  display: string;
  value: string;
}
