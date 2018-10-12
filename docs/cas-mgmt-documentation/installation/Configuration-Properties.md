---
layout: default
title: CAS - Management Web Application Properties
---

# CAS Management Web Application Properties

The management web application is primarily controlled by a `/etc/cas/config/management.(yml|properties)` file. 
Note that all configuration strategies supported by CAS should equally apply here as well in the way that settings are defined, passed and resolved. 
The primary difference of course is the name of the configuration file.

## Naming Convention

- Settings and properties that are controlled by the CAS platform directly always begin with the prefix `mgmt`. All other settings are controlled 
and provided to CAS via other underlying frameworks and may have their own schemas and syntax. **BE CAREFUL** with the distinction.

- Unrecognized properties are rejected by CAS and/or frameworks upon which CAS depends. 
This means if you somehow misspell a property definition or fail to adhere to the dot-notation syntax and such, your setting 
is entirely refused by CAS and likely the feature it controls will never be activated in the way you intend.

## Indexed Settings

Settings able to accept multiple values are typically documented with an index, such as `mgmt.some.setting[0]=value`.
The index `[0]` is meant to be incremented by the adopter to allow for distinct multiple configuration blocks:

```properties
# mgmt.some.setting[0]=value1
# mgmt.some.setting[1]=value2
```

## Properties

```properties
# mgmt.adminRoles[0]=ROLE_ADMIN
# mgmt.userRoles[0]=ROLE_USER

# mgmt.serverName=https://localhost:8443
# mgmt.defaultLocale=en

# mgmt.authzIpRegex=
# mgmt.authzAttributes[0]=
# mgmt.userPropertiesFile=classpath:user-details.properties

# mgmt.servicesRepo=/etc/cas/services-repo
# mgmt.userReposDir=/etc/cas/user-repos
# mgmt.syncScript=

# mgmt.enableVersionControl=false
# mgmt.enableDelegatedMgmt=false

# mgmt.enableDiscoveryEndpointCall=true
```

### Notifications

| Configuration Key        
|-----------------------------------
| `mgmt.notifications.submit`
| `mgmt.notifications.accept`
| `mgmt.notifications.reject`

The following properties are applicable to notification settings given the above configuration keys:

```properties
# ${configurationKey}.attributeName=mail
# ${configurationKey}.text=
# ${configurationKey}.from=
# ${configurationKey}.subject=
# ${configurationKey}.cc=
# ${configurationKey}.bcc=
```

### LDAP

```properties
# mgmt.ldap.ldapUrl = ldap://localhost:389
# mgmt.ldap.bindDn =
# mgmt.ldap.bindCredential =
# mgmt.ldap.useSsl = true

# mgmt.ldap.trustCertificates =
# mgmt.ldap.keystore = 
# mgmt.ldap.keystorePassword
# mgmt.ldap.keystoreType = 

# mgmt.ldap.minPoolSize = 3
# mgmt.ldap.maxPoolSize = 10
# mgmt.ldap.poolPassivator = BIND
# mgmt.ldap.validateOnCheckout = true
# mgmt.ldap.validatePeriodically = true 
# mgmt.ldap.validateTimeout = PT5S
# mgmt.ldap.validatePeriod = PT5M 

# mgmt.ldap.failFast = true
# mgmt.ldap.idleTime = PT10M
# mgmt.ldap.prunePeriod = PT2H
# mgmt.ldap.blockWaitTime = PT3S
# mgmt.ldap.connectionStrategy =
# mgmt.ldap.useStartTls = 
# mgmt.ldap.connectTimeout = PT5S
# mgmt.ldap.responseTimeout = PT5S
# mgmt.ldap.providerClass = 
# mgmt.ldap.allowMultipleDns = false
# mgmt.ldap.saslRealm = 
# mgmt.ldap.saslMechanism = 
# mgmt.ldap.saslAuthorizationId = 
# mgmt.ldap.saslSecurityStrength = 
# mgmt.ldap.saslMutualAuth = 
# mgmt.ldap.saslQualityOfProtection = 

```
#### LDAP Authorization

```properties
# mgmt.ldap.ldapAuthz.roleAttribute = uugid
# mgmt.ldap.ldapAuthz.rolePrefix = ROLE_
# mgmt.ldap.ldapAuthz.allowMultipleResults
# mgmt.ldap.ldapAuthz.groupAttribute
# mgmt.ldap.ldapAuthz.groupPrefix =
# mgmt.ldap.ldapAuthz.groupFilter
# mgmt.ldap.ldapAuthz.groupBaseDn
# mgmt.ldap.ldapAuthz.baseDn
# mgmt.ldap.ldapAuthz.searchFilter
```
