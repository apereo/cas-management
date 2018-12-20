import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormService} from './form.service';
import {MatSnackBar, MatTabGroup} from '@angular/material';
import {Observable} from 'rxjs/index';
import {finalize, map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';

import {
  AbstractRegisteredService,
  DataRecord,
  OAuthRegisteredService,
  OidcRegisteredService,
  RegexRegisteredService,
  SamlRegisteredService,
  UserService,
  WSFederationRegisterdService,
  MgmtFormGroup,
  SpinnerService
} from 'mgmt-lib';
import {ImportService} from '../registry/import/import.service';
import {FormArray, FormGroup} from '@angular/forms';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  domainPattern = new RegExp('^\\^?https?\\??://(.*?)(?:[(]?[:/]|$)');
  validDomain = new RegExp('^[a-z0-9-.]*$');

  imported = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: FormService,
              private importService: ImportService,
              public data: DataRecord,
              private location: Location,
              public snackBar: MatSnackBar,
              public userService: UserService,
              private breakpointObserver: BreakpointObserver,
              private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.view = this.route.snapshot.data.view;
    this.imported = this.route.snapshot.data.import;
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

  goto(tab: Tabs) {
    const route: any[] = [{outlets: {form: [this.tabRoute(tab)]}}];
    this.router.navigate(route, {skipLocationChange: true, relativeTo: this.route, replaceUrl: true});
  }

  save() {
    if (this.validate() && this.mapForm()) {
      this.spinner.start("Saving service");
      this.service.saveService(this.data.service)
        .pipe(finalize(() => this.spinner.stop()))
        .subscribe(
          resp => this.handleSave(resp),
          () => this.handleNotSaved()
        );
    }
  }

  loadService(service: AbstractRegisteredService) {
    this.data.service = service;
    this.data.formMap = new Map<String, MgmtFormGroup<AbstractRegisteredService>>();
  }

  isOidc(): boolean {
    return OidcRegisteredService.instanceOf(this.data.service);
  }

  isSaml(): boolean {
    return SamlRegisteredService.instanceOf(this.data.service);
  }

  isWsFed(): boolean {
    return WSFederationRegisterdService.instanceOf(this.data.service);
  }

  isOauth() {
    return OAuthRegisteredService.instanceOf(this.data.service);
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

  handleSave(id: number) {
    const hasIdAssignedAlready = this.data.service.id && this.data.service.id > 0;

    if (!hasIdAssignedAlready && id && id !== -1) {
      this.data.service.id = id;
      this.snackBar
        .open('Service has been added successfully.',
          'Dismiss',
          {duration: 5000}
        );
    } else {
      this.snackBar
        .open('Service has been successfully updated.',
          'Dismiss',
          {duration: 5000}
        );
    }

    this.data.service.id = id;
    this.location.back();
  }

  handleNotSaved() {
    this.snackBar
      .open('An error has occurred while attempting to save the service. Please try again later.',
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
    return 'default';
  }

  validate(): boolean {
    for (let key of Array.from(this.data.formMap.keys())) {
      const frm: FormGroup = this.data.formMap.get(key) as FormGroup;
      if (frm.status === 'INVALID') {
        console.log("errors = " +frm.errors);
        this.touch(frm);
        this.nav(key);
        return false;
      }
    }
    return true;
  }

  touch(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach(k => {
      const control = group.get(k);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.touch(control);
      } else {
        if (control.invalid) {
          console.log("touched : " + k);
          control.markAsTouched();
        }
      }
    });
  }

  mapForm(): boolean {
    let touched: boolean = this.imported;
    for (let key of Array.from(this.data.formMap.keys())) {
      const form = this.data.formMap.get(key);
      if (form.status === 'VALID' && form.touched) {
        form.mapForm(this.data.service);
        touched = true;
      }
    }
    return touched;
  }

  nav(tab: String) {
      switch (tab) {
        case 'basics' :
          this.tabGroup.selectedIndex = 0;
          break;
        case 'saml' :
        case 'oauth':
        case 'oidc' :
        case 'wsfed':
          this.tabGroup.selectedIndex = 1;
          break;
        case 'contacts' :
          this.tabGroup.selectedIndex = this.isCas() ? 1 : 2;
          break;
        case 'logout' :
          this.tabGroup.selectedIndex = this.isCas() ? 2 : 3;
          break;
        case 'accessstrategy' :
          this.tabGroup.selectedIndex = this.isCas() ? 3 : 4;
          break;
        case 'expiration' :
          this.tabGroup.selectedIndex = this.isCas() ? 4 : 5;
          break;
        case 'multiauth' :
          this.tabGroup.selectedIndex = this.isCas() ? 5 : 6;
          break;
        case 'proxy' :
          this.tabGroup.selectedIndex = this.isCas() ? 6 : 7;
          break;
        case 'userattr' :
          this.tabGroup.selectedIndex = this.isCas() ? 7 : 8;
          break;
        case 'attrRelease' :
          this.tabGroup.selectedIndex = this.isCas() ? 8 : 9;
          break;
        case 'properties' :
          this.tabGroup.selectedIndex = this.isCas() ? 9 : 10;
          break;
        case 'advanced' :
          this.tabGroup.selectedIndex = this.isCas() ? 10 : 11;
          break;
      }
  }

  reset() {
    for(let fg of Array.from(this.data.formMap.values())) {
      fg.reset(fg.formMap());
    }
  }

  touched(): boolean {
    if (this.imported) {
      return true;
    }
    for (let fg of Array.from(this.data.formMap.values())) {
      if (fg.touched) {
        return true;
      }
    }
    return false;
  }

  dirty(): boolean {
    if (this.imported) {
      return true;
    }
    for (let fg of Array.from(this.data.formMap.values())) {
      if (fg.dirty) {
        return true;
      }
    }
    return false;
  }
}
