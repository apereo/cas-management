---
layout: default
title: CAS - Management Web Application
---

# CAS Management Web Application

The web application is no longer part of the CAS server and
is a standalone Spring Boot web application that ships with an embedded Apache Tomcat container.

The management web application is purely an administrative interface that may be deployed in a completely different 
environment separate from CAS. It allows CAS administrators and application owners delegated access so they 
can manage and modify policies associated with their applications. The operational capacity of the CAS server 
itself is not in any way tied to the deployment status of the management web application; you may decide to 
take the application offline for maintenance or completely remove it from your deployment scenario at any given time.

<div class="alert alert-warning"><strong>Synchronized Configuration</strong><p>
You <strong>MUST</strong> keep in mind that both applications (the CAS server and the management webapp)
share the <strong>same</strong> service registry configuration for CAS services.</p></div>

Note that for certain type of service registry backends, deploying the management web application is a 
requirement since it acts as the interface fronting CRUD operations that deal with the storage backend. 
The absence of the management web application means that you will need to find alternative tooling to 
*manually* interact with your registry of choice and the storage backend it employs.

## Installation

### Maven

A template overlay for the management webapp is [provided here](https://github.com/apereo/cas-services-management-overlay).

### Gradle

A template overlay for the management webapp is [provided here](https://github.com/apereo/cas-services-management--gradle-overlay).

## Configuration

To see the relevant list of CAS properties, please [review this guide](Configuration-Properties.html).

## Services Registry

The [persistence storage](Service-Management.html) for services **MUST** be the same as that of the CAS server. 
The same service registry component that is configured for the CAS server, including module and settings, 
needs to be configured in the same exact way for the management web application. Note that the settings that control
the specific service registry belong to the CAS server and begin with the prefix `cas`.

## Service Management

Service managers in CAS are components that sit on top of a given registry and act as facilitators. While each registry instance is very strongly tied
to a storage technology, a service manager is entirely agnostic of the fact and solely interacts with a registry and may act as a caching layer.
For the most part, the configuration and behavior of this component is entirely transparent to the CAS deployer.

### Default vs. Domain 

There are two types of service managers that are available to use in CAS; the default option and one that is domain-name friendly. The choice is 
determined and controlled via CAS configuration properties. Both forms of services managers can use any of the persistence layers 
that are available to the CAS service registry (JSON,YAML,JDBC,MongoDb,LDAP...). Their differences come in how they load and apply the service 
registry to incoming requests.

The choice of service manager is mostly a decision of preference. This size of your registry may help determine which one you use. 
A smaller registry list of less than 100 services may seem manageable with the default manager, but a registry with hundreds 
or even thousands of services can feel daunting, considering that order is an important factor that can affect behavior.

#### Default

The default manager loads the registry as a single ordered list.  The order of the list is determined by the
`evaluationOrder` field of the registered service. When determining which service applies to the current request,
the default manager starts at the beginning of the list and attempts to match the passed `service` parameter
to the `serviceId` field of the registered service.  It walks the list until it finds the first match, and
returns that service entry.  If it reaches the end of the list without finding a match, the incoming request
is denied and the user is prompted that their application is not authorized to use CAS.

There are some caveats when putting together `serviceId`  expressions that should be observed:
- Must be a valid Java regular expression.
- Domain separators `.` typically need to be escaped. If `.` are not escaped (`\.`) in the domain it can let unintended domains match
- Domains can not be ended with `.*`

#### Domain

The domain manager loads the services into multiple lists, that are stored in a set and are indexed by the domains that they attempt to match.  
The first step the manager takes is to extract the domain from the `service` parameter of the request. 
It then looks up the list in the set of lists that are indexed by that domain, and applies this smaller list just like the default services manager did.
There is a special `default` list that is created when the services are loaded. This list contains services that have a serviceUrl 
expression that could match multiple domains.  If a request for a domain is received that does not match a list in the domain index, 
then this default list is applied to the request.

Like the default manager there are some caveats to observe:

- Must be valid Java regular expression.
- If a `serviceId` expression can match multiple domains, domain separators `.` must be escaped
- If `.` are not escaped("\.") in the domain, it can let unintended domains match.
- If a `serviceId` expression can match only a single domain, then `.` are not required to be escaped. This rule can be relaxed, 
because when the domain list is looked up, is done so by an equals expression and not a matching test. This means that only that domain 
is guaranteed to match the domains in the list.
 
## Version Control

The management webapp is able to provide version control for the service registry.  To enable version control make sure these properties are set:

```properties
mgmt.enableVersionControl=true
mgmt.servicesRepo=/etc/cas/services-repo
```
The "servicesRepo" directory must be a place where your webapp has read/write permissions.  Version control is handled by 
storing your registry as json files in a Git repository.  When the webapp is started, it will create the repository from 
your configured registry persistence, if one does not exist in the defined location.  

### Commit

When you use the management webapp without version control enabled, changes made to services are immediately put into your
configured registry persistence, and any running CAS nodes using the same registry will pick up those changes immediately.  

With version control enabled, making a change to a service marks it as a "working change" in the registry.  You can see a list
of working changes by navigating to the "Working changes" screen.  When working changes are present, a "Commit" option will
light up on the controls line in the upper right corner of the content portion of the screen.  

Pressing "Commit" will open a dialog showing all the working changes that will be committed.  You must enter a commit message 
before you will be allowed to finish the commit.  

This lets you group related changes in a single commit and give them a meaningfull message in the repository. 

### Publish 

After committing changes into the repository, a "Publish" option will appear in the controls line.  Selecting publish will 
open a dialog showing the commits that you are about to publish to your registry persistence and ask that you confirm that 
this is the action you want to take.  It is at this point, after a successful publish that the changes will be available to 
any running CAS nodes.

### History

With version control enabled all edits to services will be tracked in the repository logs.  You can navigate to the "History" 
screen to see all commits that have been made to the repository.  Selecting a commit will show you a list of services for that 
commit along with what type of change was made to that service("ADD","MODIFY","DELETE").  

From the repository history screen you can restore your registry to any one of the commits in the list.  This is first done as a "Working Change"
that you can then "Commit" and "Publish".  Also individual services can be restored from any point in the history, using the 
"History" option from the services individual menu.

You can also perform "diffs" on a service and compare the changes between the current service and anyone of its prior versions.

## Authentication

Access to the management webapp can be configured via the following strategies.

### CAS Server

The management web application can be configured to authenticate against a CAS server. 
To activate this mode, simply specify the location of the CAS server via configuration settings. 
To disable this mode, blank out the settings that describe the external CAS server.

If this strategy is used, access strategy rules can then further be controlled via the outlined strategies for authorization.

To see the relevant list of CAS properties, please [review this guide](Configuration-Properties.html#management-webapp).

### IP Address

The management web application can be configured to allow anonymous access if the request's 
IP address matches a predefined regular expression. To disable this mode, blank out the settings 
that describe the external CAS server. If this strategy is used, access strategy and authorized 
rules do not apply as the resolved identity is simply anonymous.

<div class="alert alert-danger"><strong>Be Careful</strong><p>Keep in mind that this authentication
mechanism should only be enabled for internal network clients with relatively static IP addresses.</p></div>

To see the relevant list of CAS properties, please [review this guide](Configuration-Properties.html#management-webapp).

### Anonymous

The management web application can be configured to allow anonymous access if no other authentication 
strategy is defined. This mode is mostly useful for development and testing while additional warnings 
show up in the logs that explain the caveats of this option.

<div class="alert alert-danger"><strong>Be Careful</strong><p>Be sure to specify an authentication 
strategy, as failure to do so would effectively leave the management web application open for access.</p></div>

## Authorization

Learn how to control access to the management web application. The following options describe 
how authorization rules for authenticated users are generated and made available to the management 
web application. Once roles, permissions and such are produced then the user authenticated profile 
that is now fully populated is compared to rules required and defined by the cas management web 
application for access. Essentially, the following steps execute:

1. Load roles and permissions required of authenticated users to have to enter the management web application.
2. Authenticate a given user and establish a profile.
3. Populate profile with authorization rules that contain roles, permissions, etc.
4. Compare the profile against required rules and permissions.

### Static List of Users

#### Properties

By default, access is limited to a static list of users whose credentials may be specified in a single 
properties file which is watched and monitored at runtime for changes and reloaded automatically. 
The format of the file which houses a list of authorized users to access the web application mimics that of Spring Security, which is:

```properties
# casuser=notused,ROLE_ADMIN
```

The format of the file is as such:

- `casuser`: This is the authenticated user id received from CAS
- `notused`: This is the password field that isn't used by CAS. You could literally put any value you want in its place.
- `ROLE_ADMIN`: Role assigned to the authorized user as an attribute, which is then cross checked against CAS configuration.

#### JSON & YAML

File-based authorization rules may also be specified inside a single `.json` or `.yml` that maps usernames to roles and permissions. A JSON example follows:

```json
{
  "casuser" : {
    "@class" : "org.apereo.cas.mgmt.authz.json.UserAuthorizationDefinition",
    "roles" : [ "ROLE_ADMIN" ],
    "permissions" : [ "CAN_DO_XYZ" ]
  }
}
```

### Attribute

Alternatively, the authorization generator examines the CAS validation response and principal for attributes
and will grant access if an attribute name matches the value of `adminRoles` defined in the configuration.

### LDAP

Access to the management web application may also be controlled directly by querying an LDAP server, via the following modes.

#### Groups

The authorization framework will search for groups of which the user is a member. Retrieved groups 
and roles are the compared with the management webapp configuration to find a match (i.e. `ROLE_ADMIN`).

#### Attributes

The authorization framework will examine the attributes assigned to the user, looking for a predefined 
role attribute to compare with the configuration for access (i.e. `ROLE_ADMIN`).

Support is enabled by including the following dependency in the WAR overlay:

```xml
<dependency>
  <groupId>org.apereo.cas</groupId>
  <artifactId>cas-management-webapp-support-ldap</artifactId>
  <version>${cas.version}</version>
</dependency>
```

To see the relevant list of CAS properties, please [review this guide](Configuration-Properties.html#ldap-authorization).

### Custom

You may also decide to design your own authorization generator for the management web application:

```java
package org.apereo.cas.support;

@Configuration("myConfiguration")
@EnableConfigurationProperties(CasConfigurationProperties.class)
public class MyConfiguration {

 /**
  * Decide how roles and permissions should be stuffed into the authenticated profile.
  */
  @Bean
  public AuthorizationGenerator authorizationGenerator() {
      ...
  }

 /**
  * Decide the profile should be compared to the required rules for access.
  */
  @Bean
  public Authorizer managementWebappAuthorizer() {
      ...
  }

}
```

[See this guide](Configuration-Management-Extensions.html) to learn more about how to register configurations into the CAS runtime.
