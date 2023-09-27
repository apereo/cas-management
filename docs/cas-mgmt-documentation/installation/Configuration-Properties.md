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
# mgmt.admin-roles[0]=ROLE_ADMIN
# mgmt.user-roles[0]=ROLE_USER

# mgmt.server-name=https://localhost:8443
# mgmt.default-locale=en

# mgmt.authz-ip-regex=
# mgmt.authz-attributes[0]=
# mgmt.user-properties-file=classpath:user-details.properties

# cas.service-registry.json.location=file:/etc/cas/services-repo
# mgmt.user-repos-dir=/etc/cas/user-repos
# mgmt.version-control.sync-script=

# mgmt.version-control.enabled=false
# mgmt.enable-delegated-mgmt=false

# mgmt.enable-discovery-endpoint-call=true
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
# mgmt.ldap.ldap-url = ldap://localhost:389
# mgmt.ldap.bind-dn =
# mgmt.ldap.bind-credential =
# mgmt.ldap.use-ssl = true

# mgmt.ldap.trust-certificates =
# mgmt.ldap.keystore = 
# mgmt.ldap.keystore-password =
# mgmt.ldap.keystore-type = 

# mgmt.ldap.min-pool-size = 3
# mgmt.ldap.max-pool-size = 10
# mgmt.ldap.pool-passivator = BIND
# mgmt.ldap.validate-on-checkout = true
# mgmt.ldap.validate-periodically = true 
# mgmt.ldap.validate-timeout = PT5S
# mgmt.ldap.validate-period = PT5M 

# mgmt.ldap.fail-fast = true
# mgmt.ldap.idle-time = PT10M
# mgmt.ldap.prune-period = PT2H
# mgmt.ldap.block-wait-time = PT3S
# mgmt.ldap.connection-strategy =
# mgmt.ldap.use-start-tls = 
# mgmt.ldap.connect-timeout = PT5S
# mgmt.ldap.response-timeout = PT5S
# mgmt.ldap.provider-class = 
# mgmt.ldap.allow-multiple-dns = false
# mgmt.ldap.sasl-realm = 
# mgmt.ldap.sasl-mechanism = 
# mgmt.ldap.sasl-authorization-id = 
# mgmt.ldap.sasl-security-strength = 
# mgmt.ldap.sasl-mutual-auth = 
# mgmt.ldap.sasl-quality-of-protection = 

```
#### LDAP Authorization

```properties
# mgmt.ldap.ldap-authz.role-attribute = uugid
# mgmt.ldap.ldap-authz.role-prefix = ROLE_
# mgmt.ldap.ldap-authz.allow-multiple-results =
# mgmt.ldap.ldap-authz.group-attribute =
# mgmt.ldap.ldap-authz.group-prefix =
# mgmt.ldap.ldap-authz.group-filter =
# mgmt.ldap.ldap-authz.group-base-dn =
# mgmt.ldap.ldap-authz.base-dn =
# mgmt.ldap.ldap-authz.search-filter =
```
