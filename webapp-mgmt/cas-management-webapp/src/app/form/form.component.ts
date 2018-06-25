import { Component, OnInit, ViewChild } from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormService} from './form.service';
import {Data} from './data';
import {AbstractRegisteredService, RegexRegisteredService} from '../../domain/registered-service';
import {CachingPrincipalAttributesRepository} from '../../domain/attribute-repo';
import {
  AnonymousRegisteredServiceUsernameProvider,
  PrincipalAttributeRegisteredServiceUsernameProvider
} from '../../domain/attribute-provider';
import {
  RegexMatchingRegisteredServiceProxyPolicy
} from '../../domain/proxy-policy,ts';
import {OAuthRegisteredService, OidcRegisteredService} from '../../domain/oauth-service';
import {SamlRegisteredService} from '../../domain/saml-service';
import {WSFederationRegisterdService} from '../../domain/wsed-service';
import {MatSnackBar, MatTabGroup} from '@angular/material';
import {GrouperRegisteredServiceAccessStrategy} from '../../domain/access-strategy';
import {RegisteredServiceRegexAttributeFilter} from '../../domain/attribute-filter';
import {UserService} from '../user.service';
import {ImportService} from '../import/import.service';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AppConfigService} from '../app-config.service';

enum Tabs {
  BASICS,
  TYPE,
  CONTACTS,
  LOGOUT,
  ACCESS_STRATEGY,
  EXPIRATION,
  MULTIFACTOR,
  PROXY,
  USERNAME_ATTRIBUTE,
  ATTRIBUTE_RELEASE,
  PROPERTIES,
  ADVANCED
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  id: String;
  view: boolean;

  @ViewChild('tabGroup')
  tabGroup: MatTabGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  domainPattern = new RegExp('^\\^?https?\\??://(.*?)(?:[(]?[:/]|$)');
  validDomain = new RegExp('^[a-z0-9-.]*$');

  imported = false;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: FormService,
              private importService: ImportService,
              public data: Data,
              private location: Location,
              public snackBar: MatSnackBar,
              public userService: UserService,
              private breakpointObserver: BreakpointObserver,
              public appConfig: AppConfigService) {
  }

  ngOnInit() {
    this.view = this.route.snapshot.data.view;
    this.data.view = this.view;
    if (this.route.snapshot.data.import) {
      this.imported = true;
      this.loadService(this.importService.service);
      this.goto(Tabs.BASICS);
    } else {
      this.route.data
        .subscribe((data: { resp: AbstractRegisteredService[] }) => {
          if (data.resp && data.resp[1]) {
            this.data.original = data.resp[1];
          }
          if (data.resp && data.resp[0]) {
            this.loadService(data.resp[0]);
            this.goto(Tabs.BASICS)
          }

        });
    }
  }

  goto(tab: Tabs) {
    const route: any[] = [{outlets: {form: [this.tabRoute(tab)]}}];
    this.router.navigate(route, {skipLocationChange: true, relativeTo: this.route, replaceUrl: true});
  }

  save() {
    this.saveForm();
    this.data.save.emit();
    this.data.submitted = true;
  }

  loadService(form: AbstractRegisteredService) {
    this.data.service = form;
    this.data.submitted = false;
    this.data.form = this;

    this.service.formData().subscribe(resp => this.data.formData = resp);
  }

  isOidc(): boolean {
    return OidcRegisteredService.instanceOf(this.data.service)
  }

  isSaml(): boolean {
    return SamlRegisteredService.instanceOf(this.data.service)
  }

  isWsFed(): boolean {
    return WSFederationRegisterdService.instanceOf(this.data.service)
  }

  isOauth() {
    return OAuthRegisteredService.instanceOf(this.data.service)
  }

  isCas() {
    return RegexRegisteredService.instanceOf(this.data.service);
  }

  tabRoute(tab: Tabs): String {
    if (tab < 0) {
      return 'clear';
    }
    if (tab > 0 && this.isCas()) {
      tab++
    }
    switch (tab) {
      case Tabs.BASICS :
        return 'basics';
      case Tabs.TYPE :
        if (this.isSaml()) {
          return 'saml';
        }
        if (this.isOauth()) {
          return 'oauth';
        }
        if (this.isOidc()) {
          return 'oidc';
        }
        if (this.isWsFed()) {
          return 'wsfed';
        }
        break;
      case Tabs.CONTACTS :
        return 'contacts';
      case Tabs.LOGOUT :
        return 'logout';
      case Tabs.ACCESS_STRATEGY :
        return 'accessstrategy';
      case Tabs.EXPIRATION :
        return 'expiration';
      case Tabs.MULTIFACTOR :
        return 'multiauth';
      case Tabs.PROXY :
        return 'proxy';
      case Tabs.USERNAME_ATTRIBUTE :
        return 'userattr';
      case Tabs.ATTRIBUTE_RELEASE :
        return 'attrRelease';
      case Tabs.PROPERTIES :
        return 'properties';
      case Tabs.ADVANCED :
        return 'advanced';
    }
  }

  textareaArrParse(dir, value) {
    let newValue;
    if (dir === 'load') {
      newValue = value ? value.join('\n') : '';
    } else {
      if (value !== undefined) {
        newValue = value.split('\n');
        for (let i = newValue.length - 1; i >= 0; i--) {
          newValue[i] = newValue[i].trim();
        }
      } else {
        newValue = [];
      }
    }
    return newValue;
  };

  saveForm() {
    let formErrors = -1;
    this.clearErrors();
    formErrors = this.validateForm();
    if (formErrors > -1) {
      this.snackBar
        .open(this.messages.services_form_alert_formHasErrors,
          'Dismiss',
          {duration: 5000}
        );
      this.goto(-1);
      setTimeout(() => {
        this.goto(( formErrors > 0 && this.isCas() ) ? formErrors - 1 : formErrors ) }, 10);
    } else {
      this.service.saveService(this.data.service)
        .subscribe(
          resp => this.handleSave(resp),
          () => this.handleNotSaved()
        );
    }
  };

  clearErrors() {
    this.data.invalidDomain = false;
    this.data.invalidRegEx = false;
  }

  handleSave(id: number) {
    const hasIdAssignedAlready = this.data.service.id && this.data.service.id > 0;

    if (!hasIdAssignedAlready && id && id !== -1) {
      this.data.service.id = id;
      this.snackBar
        .open(this.messages.services_form_alert_serviceAdded,
          'Dismiss',
          {duration: 5000}
        );
    } else {
      this.snackBar
        .open(this.messages.services_form_alert_serviceUpdated,
          'Dismiss',
          {duration: 5000}
        );
    }

    this.data.service.id = id;
    if (this.imported) {
      const domain = this.appConfig.config.mgmtType === 'DOMAIN' ? this.extractDomain(this.data.service.serviceId) : 'defualt'
      this.router.navigate(['services', domain]);
    } else {
      this.location.back();
    }
  }

  handleNotSaved() {
    this.snackBar
      .open(this.messages.services_form_alert_unableToSave,
        'Dismiss',
        {duration: 5000}
      );
  }

  validateRegex(pattern): boolean {
    try {
      if (pattern === '') {
        return false;
      }
      const patt = new RegExp(pattern);
      return true;
    } catch (e) {
      console.log('Failed regex');
    }
    return false;
  }

  validateDomain(service: string): boolean {
    if (this.userService.user.permissions.indexOf('*') > -1) {
      return true;
    }
    try {
      const domain = this.domainPattern.exec(service);
      if (domain != null) {
        return this.userService.user.permissions.indexOf(domain[1]) > -1;
      }
    } catch (e) {
      console.log('Failed Domain parse');
    }
    return false;
  }

  extractDomain(service: String): string {
    const domain = this.domainPattern.exec(service.toLowerCase() as string);
    if (domain != null) {
      if (this.validDomain.exec(domain[1]) != null) {
        return domain[1];
      }
    }
    return 'default'
  }

  validateForm(): Tabs {
    const data = this.data.service;

    // Service Basics
    if (!data.serviceId ||
        !this.validateRegex(data.serviceId) ||
        !data.name) {
        this.data.invalidRegEx = true;
      return Tabs.BASICS;
    }

    if (!this.userService.user.administrator &&
        !this.validateDomain(data.serviceId as string)) {
        this.data.invalidDomain = true;
      return Tabs.BASICS;
    }

    if (this.isOauth()) {
      const oauth: OAuthRegisteredService = data as OAuthRegisteredService;
      if (!oauth.clientId ||
          !oauth.clientSecret) {
        return Tabs.TYPE;
      }
    }

    if (this.isOidc()) {
      const oidc: OidcRegisteredService = data as OidcRegisteredService;
      if (!oidc.clientId ||
          !oidc.clientSecret ||
          !oidc.jwks ||
          !oidc.idTokenEncryptionAlg ||
          !oidc.idTokenEncryptionEncoding) {
        return Tabs.TYPE;
      }
    }

    if (this.isSaml()) {
      const saml: SamlRegisteredService = data as SamlRegisteredService;
      if (!saml.metadataLocation) {
        return Tabs.TYPE;
      }
    }

    if (this.isWsFed()) {
      const wsfed: WSFederationRegisterdService = data as WSFederationRegisterdService;
      if (!wsfed.appliesTo) {
        return Tabs.TYPE;
      }
    }

    if (GrouperRegisteredServiceAccessStrategy.instanceOf(data.accessStrategy)) {
      const grouper: GrouperRegisteredServiceAccessStrategy = data.accessStrategy as GrouperRegisteredServiceAccessStrategy;
      if (!grouper.groupField) {
        return Tabs.ACCESS_STRATEGY;
      }
    }

    // Username Attribute Provider Options
    if (PrincipalAttributeRegisteredServiceUsernameProvider.instanceOf(data.usernameAttributeProvider)) {
      const attrProvider: PrincipalAttributeRegisteredServiceUsernameProvider =
                          data.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
      if (!attrProvider.usernameAttribute) {
        return Tabs.USERNAME_ATTRIBUTE;
      }
      if (attrProvider.encryptUserName && (!data.publicKey || !data.publicKey.location)) {
        return Tabs.ADVANCED;
      }
    }
    if (AnonymousRegisteredServiceUsernameProvider.instanceOf(data.usernameAttributeProvider)) {
      const anonProvider: AnonymousRegisteredServiceUsernameProvider =
                          data.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
      if (!anonProvider.persistentIdGenerator) {
        return Tabs.USERNAME_ATTRIBUTE;
      }
    }

    // Proxy Policy Options
    if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(data.proxyPolicy)) {
      const regPolicy: RegexMatchingRegisteredServiceProxyPolicy = data.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy;
      if (!regPolicy.pattern || !this.validateRegex(regPolicy.pattern)) {
        return Tabs.PROXY;
      }
    }

    // Principle Attribute Repository Options
    if (CachingPrincipalAttributesRepository.instanceOf(data.attributeReleasePolicy.principalAttributesRepository)) {
      const cache: CachingPrincipalAttributesRepository =
                   data.attributeReleasePolicy.principalAttributesRepository as CachingPrincipalAttributesRepository;
      if (!cache.timeUnit) {
        return Tabs.ATTRIBUTE_RELEASE;
      }
      if (!cache.mergingStrategy) {
        return Tabs.ATTRIBUTE_RELEASE;
      }
    }
    if (data.attributeReleasePolicy.attributeFilter != null) {
      const filter = data.attributeReleasePolicy.attributeFilter as RegisteredServiceRegexAttributeFilter;
      if (!this.validateRegex(filter.pattern)) {
        return Tabs.ATTRIBUTE_RELEASE;
      }
    }
    if (data.attributeReleasePolicy.authorizedToReleaseProxyGrantingTicket ||
        data.attributeReleasePolicy.authorizedToReleaseCredentialPassword) {
      if (!data.publicKey || !data.publicKey.location) {
        return Tabs.ADVANCED;
      }
    }

    if (data.contacts) {
      if (data.contacts.length === 0 && !this.userService.user.administrator) {
        return Tabs.CONTACTS;
      }
      for (const contact of data.contacts) {
        if (!contact.name || !contact.email) {
          return Tabs.CONTACTS;
        }
      }
    }

    return -1;
  };
}
