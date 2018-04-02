import {Injectable} from '@angular/core';
/**
 * Created by tschmidt on 2/10/17.
 */
/* tslint:disable */
@Injectable()
export class Messages {
  // Welcome Screen Messages

// Blocked Errors Page
   screen_blocked_header = 'Access Denied';
   screen_blocked_message = 'You are not authorized to access this resource. Contact your CAS administrator for more info.';

// Logout Screen Messages
   screen_logout_header  = 'Logout successful';
   screen_logout_success = 'You have successfully logged out of the CAS Management web application.';

// SERVICES MANAGEMENT HEADER
   management_services_header_apptitle = 'CAS Management';
   management_services_header_navbar_navitem_addNewService = 'Add New Service';
   management_services_header_navbar_navitem_manageService = 'Manage Services';
   management_services_header_navbar_navitem_sessions = 'Sessions';
   management_services_header_navbar_navitem_logout = 'Log Out';
   management_services_header_pendingSubmits = 'There are pending submits that need to be reviewed';

// MANAGE SERVICES TABLE
   management_services_table_label_search = 'Search by Service ID, Name or Description';
   management_services_table_header_serviceName = 'Service Name';
   management_services_table_header_serviceId = 'Service URL';
   management_services_table_header_serviceDesc = 'Service Description';
   management_services_table_details_description = 'Full Description';
   management_services_table_details_proxyPolicy = 'Proxy Policy';
   management_services_table_details_attrPolicy = 'Attribute Policy Option';
   management_services_table_details_releaseCred = 'Release Credential';
   management_services_table_details_releaseProxy = 'Release Proxy ID';
   management_services_table_button_edit = 'Edit';
   management_services_table_button_duplicate = 'Duplicate';
   management_services_table_button_delete = 'Delete';
   management_services_table_modal_delete_header = 'Confirm Delete';
   management_services_table_modal_delete_msgPt1 = 'You are about to permanently delete';
   management_services_table_modal_delete_msgPt2 = 'Are you sure you wish to continue?';
   management_services_table_modal_commit_header = 'Commit to Repository';
   management_services_table_modal_commit_listheader = 'Services to be committed:';
   management_services_table_modal_commit_required = 'A commit message is required';
   management_services_table_modal_commit_placeholder = 'Enter a commit message';
   management_services_table_modal_button_commit = 'Commit';
   management_services_table_modal_button_cancel = 'Cancel';
   management_services_table_modal_button_delete = 'Delete';
   management_services_table_modal_button_submit = 'Submit';
   management_services_table_modal_submit_header = 'Submit Request';
   management_services_table_modal_submit_listheader = 'Select commits to submitted:';


   registeredService_serviceId_exists = 'A Service with that Service URL already exists.';

   application_title = 'Apereo Central Authentication Service';
   application_errors_global = 'Please correct the errors below:';

   management_services_status_deleted = 'has been successfully deleted.';
   management_services_status_notdeleted = 'A problem has occurred while trying to delete the service. Be aware that the default service can not be deleted.';
   management_services_status_listfail = 'Unable to retrieve service listing.';
   management_services_status_evaluationOrder_notupdated = 'The service evaluation order can not be updated.';
   management_services_status_committed = 'Service changes successfully committed.';
   management_services_status_published = 'Service changes successfully published.';
   management_services_status_notcommitted = 'A problem has occurred while trying to commit service changes. Please check system logs for additional information.';
   management_services_status_notpublished = 'A problem has occurred while trying to publish services to CAS nodes.  Please check system logs for additional information.';


// EDIT/ADD SERVICE FORM
  services_form_instructions = 'Please make sure to commit your changes by clicking on the Save Changes button at the bottom of the page.';
  services_form_required = 'Required';

// GENERAL LABELS
  services_form_label_true = 'True';
  services_form_label_false = 'False';

// SPECIFIC LABELS
  services_form_label_name = 'Service Name';
  services_form_label_description = 'Description';
  services_form_label_type = 'Service Type';
  services_form_label_casClients = 'CAS Client';
  services_form_label_renewalDate = 'Renewal Date';
  services_form_label_theme = 'Theme';
  services_form_label_serviceId = 'Service URL';
  services_form_label_entityId = 'Entity ID';
  services_form_label_redirect_url = 'Redirect URL';
  services_form_label_consumer_url = 'Consumer URL';
  services_form_label_requiredHandlers = 'Required Handlers';
  services_form_label_requiresDuo = 'Requires Duo';
  services_form_label_evalOrder = 'Evaluation Order';
  services_form_label_logoutUrl = 'Logout URL';
  services_form_label_informationUrl = 'Information URL';
  services_form_label_privacyUrl = 'Privacy URL';
  services_form_label_logoUrl = 'Logo URL';
  services_form_label_logoutType = 'Logout Type';
  services_form_label_assignedId = 'Assigned ID';
  services_form_label_uap_default = 'Default';
  services_form_label_uap_anon = 'Anonymous';
  services_form_label_uap_anonAttribute = 'Username Attribute';
  services_form_label_uap_principleAtt = 'Principle Attribute';
  services_form_label_uap_saltSetting = 'Salt Setting';
  services_form_label_uap_usernameAttribute = 'Username Attribute';
  services_form_label_pubKey_location = 'Location';
  services_form_label_pubKey_algorithm = 'Algorithm';
  services_form_label_proxyPolicy_refuse = 'Refuse';
  services_form_label_proxyPolicy_regex = 'Regex';
  services_form_label_oauthClientSecret = 'OAuth Client Secret';
  services_form_label_oauthClientId = 'OAuth Client ID';
  services_form_label_oauthShowSecret = 'Show Client Secret';
  services_form_label_oauthBypass = 'OAuth Bypass Approval Prompt';
  services_form_label_oauthRefreshToken = 'OAuth Refresh Token Generation';
  services_form_label_oauthJsonFormat = 'JSON format for access tokens';

  services_form_label_oidcClientSecret = 'OIDC Client Secret';
  services_form_label_oidcClientId = 'OIDC Client ID';
  services_form_label_oidcShowSecret = 'Show Client Secret';
  services_form_label_oidcBypass = 'OIDC Bypass Approval Prompt';
  services_form_label_oidcRefreshToken = 'OIDC Refresh Token Generation';
  services_form_label_oidcJsonFormat = 'JSON format for access tokens';

  services_form_label_attrRelease_excludeDefault = 'Exclude default bundle of attributes for release';
  services_form_label_attrRelease_releaseCredPassword = 'Authorized to release to credential password';
  services_form_label_attrRelease_releaseProxyTicket = 'Authorized to release proxy granting ticket ID';
  services_form_label_attrRelease_attrFilter = 'Attribute Filter Pattern';
  services_form_label_attrRelease_attrFilter_excludeUnmapped = 'Exclude Unmapped Attributes';
  services_form_label_attrRelease_attrFilter_completeMatch = 'Complete Match';
  services_form_label_attrRelease_attrFilter_scripted = 'Script';
  services_form_label_attrRelease_principleAttRepo_default = 'Default';
  services_form_label_attrRelease_principleAttRepo_cached = 'Cached';
  services_form_label_attrRelease_principleAttRepo_cached_timeUnit = 'Time Unit';
  services_form_label_attrRelease_principleAttRepo_cached_expiration = 'Expiration';
  services_form_label_attrRelease_principleAttRepo_cached_mergeStrategy = 'Merging Strategy';
  services_form_label_attrRelease_policies_scriptFile = 'Script File Location';
  services_form_label_attrRelease_policies_script = 'Script Engine';
  services_form_label_attrRelease_policies_groovy = 'Groovy Script';
  services_form_label_attrRelease_policies_denyAll = 'Deny All';
  services_form_label_attrRelease_policies_returnAll = 'Return All';
  services_form_label_attrRelease_policies_returnAllowed = 'Return Allowed';
  services_form_label_attrRelease_policies_returnMapped = 'Return Mapped';
  services_form_label_attrRelease_policies_sourceAttribute = 'Source Attribute';
  services_form_label_attrRelease_policies_casAttribute = 'CAS Attribute';
  services_form_label_attrRelease_policies_wsFedClaim = 'WS Federation Claim';
  services_form_label_attrRelease_policies_restful = 'REST Endpoint';
  services_form_label_attrRelease_policies_groovySaml = 'Script File Location';
  services_form_label_attrRelease_consent_enabled = 'User Consent Enabled';
  services_form_label_attrRelease_consent_excludedAttributes = 'Excluded Attributes';
  services_form_label_attrRelease_consent_includeOnlyAttributes = 'Include Only Attributes';
  services_form_label_attrRelease_releaseAuthenticationAttributes = 'Authorized to release authentication attributes';
  services_form_label_attrRelease_entityAttributeValues = 'Metadata Entity Attribute Values';
  services_form_label_attrRelease_entityAttribute = 'Metadata Entity Attribute';
  services_form_label_attrRelease_entityAttributeFormat = 'Metadata Entity Attribute Format';
  services_form_label_sas_authorizedCodes = 'Acceptable HTTP Codes';
  services_form_label_sas_casEnabled = 'Enable Service';
  services_form_label_sas_ssoEnabled = 'Allow Single Sign-On';
  services_form_label_sas_requireAll = 'Require All Attributes';
  services_form_label_sas_requiredAttr = 'Required Attributes';
  services_form_label_sas_starttime = 'Starting Date/Time';
  services_form_label_sas_endtime = 'Ending Date/Time';
  services_form_label_sas_unauthorizedredirecturl = 'Unauthorized Redirect Url';
  services_form_label_sas_remoteUrl = 'Remote Url';
  services_form_label_sas_caseinsensitive = 'Case Insensitive';
  services_form_label_sas_rejectedattributes = 'Rejected Attributes';
  services_form_label_sas_rejectedattributes_name = '\'Name\'';
  services_form_label_sas_rejectedattributes_value = '\'Values\'';
  services_form_label_sas_selecttype = 'Select Type';
  services_form_label_sas_grouper_groupfield = 'Group Field';
  services_form_label_sas_surrogate_enabled = 'Surrogate Enabled';
  services_form_label_sas_surrogate_ssoEnabled = 'Surrogate SSO Enabled';
  services_form_label_sas_surrogate_requiredAttributes = 'Surrogate Required Attributes';
  services_form_label_multiauth_providers = 'Providers';
  services_form_label_multiauth_failuremode = 'Failure Mode';
  services_form_label_multiauth_principalattribute_nametrigger = 'Principal Attribute Name Trigger';
  services_form_label_multiauth_principalattribute_valuetomatch = 'Principal Attribute Value To Match';
  services_form_label_multiauth_bypassenabled = 'Enable Bypass';

  services_form_label_saml_header = 'SAML Client';
  services_form_label_saml_metadata_location = 'Metadata Location';
  services_form_label_saml_metadata_maximumvalidity = 'Metadata Maximum Validity';
  services_form_label_saml_authenticationcontextclass = 'Authentication Context Class';
  services_form_label_saml_metadata_signaturepublickeylocation = 'Metadata Public Key Location';
  services_form_label_saml_signassertions = 'Sign Assertions';
  services_form_label_saml_signresponses = 'Sign Responses';
  services_form_label_saml_encryptassertions = 'Encrypt Assertions';
  services_form_label_saml_removeEmptyEntities = 'Remove Empty Entities Descriptors';
  services_form_label_saml_removeRoleless = 'Remove Empty Roles';
  services_form_label_saml_metadata_pattern = 'Metadata Filter Regex';
  services_form_label_saml_metadata_dir = 'Metadata Filter Criteria';
  services_form_label_saml_metadata_role = 'Whitelisted Metadata Roles';
  services_form_label_saml_requiredNameIdFormat = 'Required NameID Format';
  services_form_label_saml_serviceProviderNameQualifier = 'Service Provider Name Qualifier';
  services_form_label_saml_nameQualifier = 'Name Qualifier';
  services_form_label_saml_skipAssertionNameId = 'Skip generating assertion name id';
  services_form_label_saml_skipInResponseTo = 'Skip generating subject confirmation InRespsonseTo';
  services_form_label_saml_skipNotOnOrAfter = 'Skip generating subject confirmation NotOnOrAfter';
  services_form_label_saml_skipRecipient = 'Skip generating subject confirmation Recipient';
  services_form_label_saml_skipNotBefore = 'Skip generating subject confirmation NotBefore';
  services_form_label_saml_signingCredentialType = 'Signing Credential Type';

  services_form_label_oidc_scopes = 'Scopes';
  services_form_label_oidc_dynamic = 'Dynamically Registered';
  services_form_label_oidc_dynamicDate = 'Dynam ically Registered At';
  services_form_label_oidc_signToken = 'Sign ID Token';
  services_form_label_oidc_implicit = 'Enable Implicit';
  services_form_label_oidc_encrypt = 'Encrypt ID Token';
  services_form_label_oidc_encryptEnc = 'Encryption Encoding Algorithm';
  services_form_label_oidc_encryptAlg = 'Encryption Algorithm';
  services_form_label_oidc_jwks = 'JSON Web Keystore';
  services_form_label_oidc_user_defined_scopes = 'User Defined Scopes';
  services_form_label_oidc_subject_type = 'Subject Type';
  services_form_label_oidc_sector_identifier_uri = 'Sector Identifier URI';

  services_form_label_expirationPolicy_expirationDate = 'Expiration Date';
  services_form_label_expirationPolicy_deleteWhenExpired = 'Delete service when expired';
  services_form_label_expirationPolicy_notifyWhenDeleted = 'Notifiy contacts when service is deleted';

  services_form_header_page_addService = 'Add Service';
  services_form_header_page_editService = 'Edit Service';
  services_form_header_oauthOptions = 'OAuth Client Options Only';
  services_form_header_usernameAttProvider = 'Username Attribute Provider Options';
  services_form_header_pubKey = 'Public Key Options';
  services_form_header_proxyPolicy = 'Proxy Policy Options';
  services_form_header_attrRelPolicy = ' Attribute Release Policy Options';
  services_form_header_principleAttRepo = 'Principle Attribute Repository Options';
  services_form_header_attrPolicy = 'Attribute Policy Options';
  services_form_header_sas = 'Service Access Strategy';
  services_form_header_properties = 'Properties';
  services_form_header_properties_name = '\'Name\'';
  services_form_header_properties_value = '\'Values\'';
  services_form_header_multiauth = 'Multifactor Authentication Policy';
  services_form_header_samlclient = 'SAML Client';

  services_form_button_save = 'Save Changes';
  services_form_button_cancel = 'Cancel';

  services_form_warning_casDisabled = 'By disabling the service it will no longer be accessible.';

  services_form_alert_loadingFailed = 'An error has occurred while attempting to load your service. Please try again later.';
  services_form_alert_formHasErrors = 'Form validation has failed. Please fix the errors before attempting to save again.';
  services_form_alert_unableToSave = 'An error has occurred while attempting to save the service. Please try again later.';
  services_form_alert_serviceAdded = 'Service has been added successfully.';
  services_form_alert_serviceUpdated = 'Service has been successfully updated.';


// SERVICE FORM TOOLTIPS
  services_form_tooltip_assignedId = 'Numeric identifier for this service that is auto-generated by CAS.';
  services_form_tooltip_serviceId = 'A url that represents the application. This can be a regex/ant formatted url.';
  services_form_tooltip_entityId = 'An string that represents the EntityId of the SAML2 SP. This can be a regex pattern.';
  services_form_tooltip_redirect_url = 'A url that represents the OAuth/OIDC server to redirect to.';
  services_form_tooltip_consumer_url = 'A url that represents a WS Federation Consumer URL';
  services_form_tooltip_name = 'The service name.';
  services_form_tooltip_description = 'The service description.';
  services_form_tooltip_type = 'Everything that applies to a CAS client applies to an OAuth client too, but OAuth clients have a few more extra settings.';
  services_form_tooltip_casClients = 'List any known CAS Clients used by this service.(mod_auth_cas...)';
  services_form_tooltip_renewalDate = 'This is the date by which the service will need to verified active by the service contacts.';
  services_form_tooltip_oauthClientSecret = 'Secret key for this OAuth client. Only applies to OAuth service types.';
  services_form_tooltip_oauthClientId = 'OAuth client id for this OAuth client. Only applies to OAuth service types.';
  services_form_tooltip_oauthShowSecret = 'Enable to show your OAuth Client Secret.';
  services_form_tooltip_oauthBypass = 'Indicates whether the OAuth confirmation screen should be displayed before accessing the service application.';
  services_form_tooltip_oauthRefreshToken = 'Indicates whether a refresh token should be generated with the access token for this OAuth client';
  services_form_tooltip_oauthJsonFormat = 'Indicates whether the access token response should be in JSON format or in plain text';

   services_form_tooltip_oidcClientSecret = 'Secret key for this OIDC client. Only applies to OIDC service types.';
   services_form_tooltip_oidcClientId = 'OAuth client id for this OIDC client. Only applies to OIDC service types.';
   services_form_tooltip_oidcShowSecret = 'Enable to show your OIDC Client Secret.';
   services_form_tooltip_oidcBypass = 'Indicates whether the OIDC confirmation screen should be displayed before accessing the service application.';
   services_form_tooltip_oidcRefreshToken = 'Indicates whether a refresh token should be generated with the access token for this OIDC client';
   services_form_tooltip_oidcJsonFormat = 'Indicates whether the access token response should be in JSON format or in plain text';

  services_form_tooltip_theme = 'A token that represents the theme that should be applied to CAS when this service asks for authentication.  Valid values are a theme name configured in the CAS deployment, a REST endpoint or a groovy file location.';
  services_form_tooltip_evalOrder = 'Determines how CAS should load, sort and evaluate services per this numeric order.';
  services_form_tooltip_requiredHandlers = 'Collection of authentication handler ids defined in the CAS server configuration ' +
    'that indicate the set of authentication handlers that must successfully execute before access to this service can be granted.';
  services_form_tooltip_requiresDuo = 'Setting to true will require Duo authentication for this service.';
  services_form_tooltip_logoutUrl = 'Url where logout requests will be sent to, for this service.';
  services_form_tooltip_informationUrl = 'Url that describes help information and guides for this service.';
  services_form_tooltip_privacyUrl = 'Url that describes the privacy policies for this service.';
  services_form_tooltip_logoUrl = 'The logo representing this service that would be displayed on the login page. Could be a file/classpath path or an actual http url.';
  services_form_tooltip_logoutType = 'Defines how CAS should execute logout operations when dealing with this service.';
  services_form_tooltip_uap_anonAttribute = 'Username attribute used for anonymous id generation.';
  services_form_tooltip_uap_saltSetting = 'The salt used for anonymous id generation.';
  services_form_tooltip_uap_usernameAttribute = 'Username attribute used to return back to the service as the identifier.';
  services_form_tooltip_pubKey_location = 'The location to the public key file used to authenticate and sign the CAS response. ' +
    'This is specifically used to encrypt and sign the credential and the proxy granting ticket returned directly in the CAS validation ' +
    'response, provided the service is authorized to release those attributes.'
  services_form_tooltip_pubKey_algorithm = 'Represents a public key for a CAS registered service, used to encrypt credentials, proxy granting ticket ids for release.';
  services_form_tooltip_proxyPolicy_regex = 'Matches the proxy callback url against a regex pattern. A successful match will authorize proxy authentication. ';
  services_form_tooltip_attrRelease_excludeDefault = 'Indicates whether global and default attributes set to release to all applications ' +
    'should be excluded for release for this specific application.'
  services_form_tooltip_attrRelease_attrFilter = 'A regex pattern used to filter attributes based on their values only. ' +
    'Values that successfully pass the filter will be available for release to the application.'
  services_form_tooltip_attrRelease_attrFilter_excludeUnmapped = 'Indicates whether unmapped attributes should be removed from the final bundle.';
  services_form_tooltip_attrRelease_attrFilter_completeMatch = 'Indicates whether pattern-matching should execute over the entire value region';
  services_form_tooltip_attrRelease_attrFilter_scripted = 'This field can accept either an inline groovy script that will be executed or a location of an external script file that will be loaded and executed.'
  services_form_tooltip_attrRelease_releaseCredPassword = 'Release credential password to the application?';
  services_form_tooltip_attrRelease_releaseProxyTicket = 'Release proxy-granting ticket id to the application?';
  services_form_tooltip_attrRelease_principleAttRepo_cached_timeUnit = 'Time unit of measure for the cache expiration policy.';
  services_form_tooltip_attrRelease_principleAttRepo_cached_expiration = 'The cache expiration time. ';
  services_form_tooltip_attrRelease_policies_returnAllowed = 'List of resolved attributes out of the available collection of attributes from the attribute repository. Select attributes that are allowed to be released to the application';
  services_form_tooltip_attrRelease_policies_returnWsMapped = 'List of WS Federation Claims that will be mapped to the corresponding attribute from the attributes repository.';
  services_form_tooltip_attrRelease_policies_restful = 'The URL of the REST endpoint that will be called to retrieve a list of attributes that will be released';
  services_form_tooltip_attrRelease_policies_groovySaml = 'Location of a groovy script file that can be triggered by the server to determine the attributes to be released';
  services_form_tooltip_attrRelease_consent_enabled = 'Control whether consent is active/inactive for this service.';
  services_form_tooltip_attrRelease_consent_excludedAttributes = 'Exclude the indicated attributes from consent.';
  services_form_tooltip_attrRelease_consent_includeOnlyAttributes = 'Force-include the indicated attributes in consent, provided attributes are resolved.';
  services_form_tooltip_attrRelease_releaseAuthenticationAttributes = 'Determines whether this policy should exclude the authentication/protocol attributes for release. Authentication attributes are considered those that are not tied to a specific principal and define extra supplamentary metadata about the authentication event itself, such as the commencement date.';
  services_form_tooltip_attrRelease_entityAttributeValues = 'List of attributes that are defined as part of the SP Metadata';
  services_form_tooltip_attrRelease_entityAttribute = 'The EntityId for the SP providing the metadata attributes';
  services_form_tooltip_attrRelease_entityAttributeFormat = 'Format description for the entity attribute.  This field is optional'
  services_form_tooltip_sas_starttime = 'Determines the starting date/time from which service access is allowed.';
  services_form_tooltip_sas_endtime = 'Determines the ending date/time from which service access is allowed.';
  services_form_tooltip_sas_casEnabled = 'Decides whether access to this service is authorized by CAS.';
  services_form_tooltip_sas_ssoEnabled = 'Decides whether this service is allowed to participate in SSO.';
  services_form_tooltip_sas_requireAll = 'Decides whether all attributes AND corresponding values should be evaluated before access can be granted. If left unchecked, the first successful match on attribute name and value will allow access.';
  services_form_tooltip_sas_requiredAttr = 'These are a set of attributes along with their values that decide whether access to this service can be granted. To configure, only provide values for attributes you care about, and leave the rest blank.';
  services_form_tooltip_sas_unauthorizedredirecturl = 'URL to which CAS should direct in the event that service access is defined.';
  services_form_tooltip_sas_remoteUrl = 'URL that CAS should contact to determine if access to this service should be granted.';
  services_form_tooltip_sas_caseinsensitive = 'Indicates whether matching on required attribute values should be done in a case-insensitive manner.';
  services_form_tooltip_sas_rejectedattributes = 'A Map of rejected principal attribute names along with the set of values for each attribute. These attributes MUST NOT be available to the authenticated Principal so that access may be granted. If none is defined, the check is entirely ignored.';
  services_form_tooltip_sas_selecttype = 'Access strategy type';
  services_form_tooltip_sas_authorizedCodes = 'Acceptable HTTP codes before granting access to this service.';
  services_form_tooltip_sas_grouper = 'This access strategy attempts to locate Grouper groups for the CAS principal. The groups returned by ' +
    'Grouper are collected as CAS attributes and examined against the list of required attributes for service access.'
  services_form_tooltip_sas_surrogate_enabled = 'Determines whether this service is allowed to use surrogate authentication.';
  services_form_tooltip_sas_surrogate_ssoEnabled = 'Determines whether a Surrogate authentication should participate in SSO';
  services_form_tooltip_sas_surrogate_requiredAttributes = 'List of attributes and values that must be present for the primary user in order to allow surrogate authentication';
  services_form_tooltip_multiauth_providers = 'List of multifactor provider ids to assign to this service.';
  services_form_tooltip_multiauth_failuremode = 'Decide what CAS should do in the event that a provider is not available.';
  services_form_tooltip_multiauth_principalattribute_nametrigger = 'Principal attribute name to trigger MFA when accessing this service.';
  services_form_tooltip_multiauth_principalattribute_valuetomatch = 'Principal attribute value to match in order to trigger MFA when accessing this service.';
  services_form_tooltip_multiauth_bypassenabled = 'Bypass multifactor authentication for this service.';

  services_form_tooltip_saml_header = 'SAML Client';
  services_form_tooltip_saml_metadata_location = 'Metadata location for this particular service provider.';
  services_form_tooltip_saml_metadata_maximumvalidity = 'Indicates how long should metadata be considered valid.';
  services_form_tooltip_saml_authenticationcontextclass = 'The authentication context class that may be passed to the service provider. If ' +
    'none is defined here forcefully, metadata will be consulted instead.';
  services_form_tooltip_saml_metadata_signaturepublickeylocation = 'Location of the metadata signing public key so its authenticity can be ' +
    'verified.';
  services_form_tooltip_saml_signassertions = 'Sign Assertions';
  services_form_tooltip_saml_signresponses = 'Sign Responses';
  services_form_tooltip_saml_encryptassertions = 'Encrypt Assertions';
  services_form_tooltip_saml_removeEmptyEntities = 'Controls whether to keep entities descriptors that contain no entity descriptors';
  services_form_tooltip_saml_removeRoleless = 'Controls whether to keep entity descriptors that contain no roles';
  services_form_tooltip_saml_metadata_pattern = 'Regex applied to entity ids in a metadata aggregate';
  services_form_tooltip_saml_metadata_dir = 'Whether to include/exclude entity ids that match the filter pattern';
  services_form_tooltip_saml_metadata_role = 'Whitelisted roles to keep in the metadata.';
  services_form_tooltip_saml_requiredNameIdFormat = 'Force the indicated Name ID format in the final SAML response';
  services_form_tooltip_saml_serviceProviderNameQualifier = 'Overwrite the SPNameQualifier attribute of the produced subject name id';
  services_form_tooltip_saml_nameQualifier = 'Overwrite the NameQualifier attribute of the produced subject name id';
  services_form_tooltip_saml_skipAssertioNameId = 'Whether generation of a name identifier should be skipped for assertions';
  services_form_tooltip_saml_skipInResponseTo = 'Whether generation of the InResponseTo element should be skipped for subject confirmations';
  services_form_tooltip_saml_skipNotOnOrAfter = 'Whether generation of the NotOnOrAfter element should be skipped for subject confirmations';
  services_form_tooltip_saml_skipRecipient = 'Whether generation of the Recipient element should be skipped for subject confirmations';
  services_form_tooltip_saml_skipNotBefore = 'Whether generation of the NotBefore element should be skipped for subject confirmations';
  services_form_tooltip_saml_signingCredentialType = 'This setting controls the type of the signature block produced in the final SAML response for this application. The latter, being the default, encodes the signature in PEM format inside a X509Data block while the former encodes the signature based on the resolved public key under a DEREncodedKeyValue block.';

  services_form_tooltip_oidc_signToken = 'Whether ID tokens should be signed.';
  services_form_tooltip_oidc_encrypt = 'Whether ID tokens should be encrypted.';
  services_form_tooltip_oidc_encryptEnc = 'Encryption content encoding algorithm to use with ID tokens.';
  services_form_tooltip_oidc_encryptAlg = 'Encryption algorithm to use with ID tokens.';
  services_form_tooltip_oidc_implicit = 'Indicates whether this service should support the implicit flow.';
  services_form_tooltip_oidc_jwks = 'Location of the JSON web keystore to sign id tokens with. ';
  services_form_tooltip_oidc_scopes = 'Scopes';
  services_form_tooltip_oidc_user_defined_scopes = 'List any custom defined scopes that should be released.'
  services_form_tooltip_oidc_subject_type = 'Type to use when generating principal identifiers. Default is public.'
  services_form_tooltip_oidc_sector_identifier_uri = 'Host value of this URL is used as the sector identifier for the pairwise identifier calculation. If left undefined, the host value of the serviceId will be used instead.'

  services_form_tooltip_expirationPolicy_expirationDate = 'The date on which the registration record is deemed expired. The expiration date may be specified in 2011-12-03T10:15:30, 09/24/1980 04:30 PM, 09/24/2014 6:30 AM, 09/24/2013 18:45, 09/24/2017 or 2017-10-25 formats.';
  services_form_tooltip_expirationPolicy_deleteWhenExpired = 'When true, removes the application from the CAS service registry if and when expired. Otherwise the application record will be marked as disabled.';
  services_form_tooltip_expirationPolicy_notifyWhenDeleted = 'Notifies contacts of the application via email or text, assuming valid contacts with email addresses or phone numbers are defined and CAS is configured to send email messages or SMS notifications. The notification is only sent if the application is expired and is about to be deleted from the registry.';

  services_form_tooltip_attrRelease_principleAttRepo_cached_mergeStrategy = 'Decides how attributes that are retrieved from the cache ' +
    'should be merged into the existing attribute repository. Attributes may be replaced, ignored or contain multiple ' +
    'values as a result of the merge action.';
   management_services_service_noAction = 'No further action is required.';

   screen_unavailable_heading = 'The CAS management webapp is unavailable. ';
   screen_unavailable_message = 'There was an error trying to complete your request. Please notify your support desk or try again.';

   footer_links = 'Links to CAS Resources:';
   footer_homePage = 'Home Page';
   footer_wiki = 'Wiki';
   footer_issueTracker = 'Issue Tracker';
   footer_mailingLists = 'Mailing Lists';
   footer_copyright = 'Copyright &copy; 2005 - 2017 Apereo, Inc. All rights reserved.';
   footer_poweredBy = 'Powered by <a href=\'http://www.apereo.org/cas\'>Apereo Central Authentication Service {0}</a>';

   services_form_label_canonicalizationMode = 'cononicalizationMode';
   services_form_label_attrRelease_policies_patternMatching = 'Pattern Matching';
   services_form_label_attrRelease_policies_releaseIncommon = 'InCommon';

   services_form_label_wsfed_realm = 'Realm';
   services_form_label_wsfed_appliesTo = 'appliesTo'
   services_form_label_wsfed_wsFederationOnly = 'WS Federation only';

   services_form_header_wsfedOptions = 'WS Federation';
   services_form_header_nameId = 'Name ID Selection';
   services_form_header_nameId_name = 'Name';
   services_form_header_nameId_value = 'Value';

   services_form_tooltip_uap_canonicalizationMode = 'canonicalizationMode tooltip';

   services_form_tooltip_attrRelease_policies_patternMatching = 'In the event that an aggregate is defined containing multiple entity ids, the below attribute release policy may be used to release a collection of allowed attributes to entity ids grouped together by a regular expression pattern.';
   services_form_tooltip_attrRelease_policies_releaseInCommon = 'Release the attribute bundles needed for InCommon\'s Research and Scholarship service providers?'

   services_form_tooltip_wsfed_realm = 'The realm identifier of the application, identified via the wtrealm parameter. This needs to match the realm defined for the identity provider. By default it’s set to the realm defined for the CAS identity provider.';
   services_form_tooltip_wsfed_appliesTo = 'Controls to whom security tokens apply. Defaults to the realm';

   services_form_label_uap_canonicalizationMode = 'Canonicalization Mode';

}
