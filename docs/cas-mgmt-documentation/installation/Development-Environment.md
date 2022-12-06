# Setting up CAS Management for UI development

When planning to contribute a fix or change to the CAS Management application, it is best to have access to a set of commands and configuration files to make local development more productive and efficient. We will reference two sides of the CAS Management application, the Administrator Dashboard (referred to simply as 'Dashboard') and Services Management (referred to simply as 'service registry').

You may need to make adjustments to the commands below based on your environment, especially if it is a Windows environment. The commands below assume a *nix based operating system.

## System Requirements

* Java (JDK 11)
* Visual Studio Code
* Command Line Interface (I recommend oh-my-zsh)
* Node.js

## Setting up CAS Management

First, download or checkout the source code for the [CAS Management](https://github.com/apereo/cas-management) application. You will want to make sure you download the correct version of CAS Management, or if using GIT, checkout the version branch accordingly (for example, `git checkout 6.4.x`).

Create a folder at `/etc/cas/config` on your local computer, and create a file `management.properties` in that folder. Add these values to that folder.

```bash
cas.server.name=https://casserver.herokuapp.com
cas.server.prefix=${cas.server.name}/cas

mgmt.serverName=https://localhost:8443
mgmt.adminRoles[0]=ROLE_ADMIN
mgmt.userPropertiesFile=file:/etc/cas/config/users.json

logging.config=file:/etc/cas/config/log4j2-management.xml
```

In addition to `/etc/cas/config/management.properties`, you will need to add a users.json file at `/etc/cas/config/users.json`. Add this to that file:

```JSON
{
  "casuser" : {
    "@class" : "org.apereo.cas.mgmt.authz.json.UserAuthorizationDefinition",
    "roles" : [ "ROLE_ADMIN" ]
  }
}
```

You may want to make adjustments to fit your environment needs, such as changing ports and domains. The first line will have your local environment pointed at the demo instance of CAS deployed on Heroku. Later, we'll show you how to configure a local instance of CAS.

This will set up a default user with the role of administrator.

Now, in your command line, navigate to `{ project root }/webapp/cas-mgmt-webapp-tomcat` and enter the following command to start up the embedded tomcat instance.

```bash
../../gradlew build && ../../gradlew bootRun --configure-on-demand --build-cache --parallel --scan --stacktrace -x check -x test -x javadoc -DskipErrorProneCompiler=true -DbuildDev=true -DskipClientBuild=true
```

Once you see the large ASCII `READY` text in your console, navigate a browser of choice to `https://localhost:8443/cas-management`. The application should be up and running, prompting you to log in. You can get the credentials [here](https://apereo.github.io/cas/Demos.html).

In order to compile the Typescript code for the UI, you will need to open a second command line interface window, and navigate to `{ project root }/webapp/cas-mgmt-webapp-workspace`. From here, run the following command to build the UI and set up a watcher for when you make code changes:

```bash
ng build --source-map=true --watch --poll 1000
```

This will create a watcher for the management application code. If you require working on the dashboard application, append `dashboard` to the end of the command, like so:

```bash
ng build --source-map=true --watch --poll 1000 dashboard
```

## CAS Management code structure

The UI code of the CAS Management web application is organized into two separate applications, called `dashboard` and `management`. These two applications rely on a library also included in the code-base, called `mgmt-lib`. This is where any code that is shared between these two applications should live. The applications themselves are really just wrappers, with the specific routes and views tied only to their application. The forms and services which make up the bulk of the code for either application lives in `mgmt-lib`.

## Optional - Setting up CAS Management without authentication

It is also possible to configure CAS Management to not require authentication at all. This can be useful for rapid and efficient testing of new features and bug fixes that do not require any sort of authentication or authorization.

In order to set this up, you only need to modify `management.properties` in `/etc/cas/config` to include these lines:

```
cas.server.name=https://casserver.herokuapp.com
cas.server.prefix=${cas.server.name}/cas

mgmt.cas-sso=false
mgmt.authz-ip-regex=.*

mgmt.serverName=https://localhost:8443
```

## Optional - Setting up CAS Management VCS (version control)

It is possible to enable version control features in CAS Management, which creates a submitter / approver workflow where one user submits a change (ex. to a service) and an administrator is able to approve or deny this change.

Note: In order to use both sides of version control (submitter / approver) it is best to provide two users, so that you can test submission and approval. This means it is a good idea to set up multiple users with authentication.

```bash
cas.server.name=https://casserver.herokuapp.com
cas.server.prefix=${cas.server.name}/cas

mgmt.serverName=https://localhost:8443
mgmt.version-control.enabled=true
mgmt.delegated.enabled=true
mgmt.user-properties-file=file:/etc/cas/config/users.json
mgmt.admin-roles[0]=ROLE_ADMIN
mgmt.user-roles[0]=ROLE_USER

cas.service-registry.init-from-json=true
cas.service-registry.json.location=file:/Users/ryanmathis/Development/projects/IAM/Apereo-CAS/service-registry
```

The user-details JSON file should also contain:

```JSON
{
    "casuser" : {
        "@class" : "org.apereo.cas.mgmt.authz.json.UserAuthorizationDefinition",
        "roles" : [ "ROLE_USER" ],
        "permissions": [ "default" ]
    },
    "casadmin" : {
        "@class" : "org.apereo.cas.mgmt.authz.json.UserAuthorizationDefinition",
        "roles" : [ "ROLE_ADMIN" ],
        "permissions": [ "*" ]
    }
}
```

Then you need to have two browsers open; one logged in with casuser and one logged in with casadmin. (You need an external authn like CAS)

## Optional - Setting up CAS Overlay

Now we will implement a CAS Overlay. This is needed when working with many of the views within the Dashboard. If you are not planning to work on the Dashboard code, you can skip this step.

Download a copy of the CAS Overlay template from Github, [here](http://foo.com). Make sure the major version of CAS and CAS Management match (for example, if using Management 6.4.x, make sure you get the CAS Overlay for CAS 6.4.x). Copy the files in `{ project root }/etc/cas/config` to your local environments `/etc/cas/config` folder.

The following properties will need to be added to your `/etc/cas/cas.properties` file in order to allow the CAS Management Dashboard to connect to the APIs provided by CAS.

```bash
cas.serviceRegistry.json.location=file:/etc/cas/services

endpoints.health.sensitive=false
management.endpoints.enabled-by-default=true
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
management.endpoint.health.show-components=always

management.health.systemHealthIndicator.enabled=true
management.health.memoryHealthIndicator.enabled=true
management.health.sessionHealthIndicator.enabled=true
```

In order to enable these endpoints, you will need to add dependencies in build.gradle of your CAS Overlay. Find the `dependencies` block that contains the line `implementation "org.apereo.cas:cas-server-webapp-init"` and below that, add these two lines:

```gradle
implementation "org.apereo.cas:cas-server-support-reports"
implementation "org.apereo.cas:cas-server-core-monitor"
```

Then, using a CLI from the root of the overlay folder, you can run `./gradlew clean build` followed by `./gradlew run` and the CAS 6 server should start up. Once you see the large ASCII `READY` text in your console, navigate a browser of choice to `https://localhost:8443/cas`.

For more advanced configuration of CAS, refer to the CAS Documentation.
