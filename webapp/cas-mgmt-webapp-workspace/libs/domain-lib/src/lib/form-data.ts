export class FormData {
    availableAttributes: string[];
    attributeRepositories: string[] = [];
    ldapAttributes: string[] = [];
    registeredServiceProperties: Property[];
    grouperFields: string[];
    remoteCodes: string[];
    timeUnits: string[];
    mergingStrategies: string[];
    logoutTypes: string[];
    serviceTypes: Option[];
    samlRoles: string[];
    samlDirections: string[];
    samlAttributeNameFormats: Option[];
    samlCredentialTypes: string[];
    wsFederationClaims: string[];
    mfaProviders: Option[];
    mfaFailureModes: string[];
    oidcScopes: Option[];
    encodingAlgOptions: string[];
    encryptAlgOptions: string[];
    oidcSubjectTypes: Option[];
    oidcApplicationTypes: Option[];
    canonicalizationModes: string[];
    delegatedAuthnProviders: string[];
    oauth20GrantTypes: Option[];
    oauth20ResponseTypes: Option[];
    samlIdpAttributes: string[];
    samlNameIdFormats: Option[];
}

export interface Option {
  display: string;
  value: string;
}

export interface Property {
  propertyName: string;
  defaultValue: string;
}
