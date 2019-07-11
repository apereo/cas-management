import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormService} from './form.service';
import {MatSnackBar, MatTabChangeEvent, MatTabGroup} from '@angular/material';
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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  id: string;
  view: boolean;
  created: false;

  @ViewChild('tabGroup', { static: true })
  tabGroup: MatTabGroup;

  tabs: Array<string[]> = [];

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
    this.created = this.route.snapshot.data.created;
    this.route.data
      .subscribe((data: { resp: AbstractRegisteredService[] }) => {
        if (data.resp && data.resp[1]) {
          this.data.original = data.resp[1];
        }
        if (data.resp && data.resp[0]) {
          this.loadService(data.resp[0]);
          this.navTo('basics');
        }
      });
    this.data.typeChange.subscribe(() => this.setNav());
  }

  goto(event: MatTabChangeEvent) {
    this.navTo(this.tabs[event.index][0]);
  }

  navTo(tab: String) {
    const route: any[] = [{outlets: {form: [tab]}}];
    this.router.navigate(route, {skipLocationChange: true, relativeTo: this.route, replaceUrl: true});
  }

  save() {
    if (this.validate() && this.mapForm()) {
      this.spinner.start('Saving service');
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
    this.data.formMap = new Map<string, MgmtFormGroup<AbstractRegisteredService>>();
    this.setNav();
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

  validate(): boolean {
    for (const key of Array.from(this.data.formMap.keys())) {
      const frm: FormGroup = this.data.formMap.get(key) as FormGroup;
      if (frm.invalid) {
        this.touch(frm);
        this.tabGroup.selectedIndex = this.tabs.findIndex(entry => entry[0] === key);
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
          control.markAsTouched();
        }
      }
    });
  }

  mapForm(): boolean {
    let touched: boolean = this.imported || this.created;
    for (const key of Array.from(this.data.formMap.keys())) {
      const form = this.data.formMap.get(key);
      if (form.valid && form.touched) {
        form.mapForm(this.data.service);
        touched = true;
      }
    }
    return touched;
  }

  setNav() {
    this.tabs = [];
    this.tabs.push(['basics', 'Basics']);
    if (this.isSaml()) {
      this.tabs.push(['saml-metadata', 'Metadata']);
      this.tabs.push(['saml-assertion', 'Assertion']);
      this.tabs.push(['saml-attributes', 'Attributes']);
      this.tabs.push(['saml-encryption', 'Encryption']);
      this.tabs.push(['saml-signing', 'Signing']);
    }
    if (this.isOauth() || this.isOidc()) {
      this.tabs.push(['oauth', 'Client']);
      this.tabs.push(['tokens', 'Tokens']);
    }
    if (this.isOidc()) {
      this.tabs.push(['oidc', 'OIDC']);
    }
    if (this.isWsFed()) {
      this.tabs.push(['wsfed', 'WS Fed']);
    }
    this.tabs.push(['contacts', 'Contacts']);
    this.tabs.push(['logout', 'Logout']);
    if (this.isOidc()) {
      this.tabs.push(['scopes', 'Scopes'])
    } else if (this.isWsFed()) {
      this.tabs.push(['claims', 'Claims'])
    } else {
      this.tabs.push(['attrRelease', 'Attribute Release']);
    }
    this.tabs.push(['accessstrategy', 'Access Srategy']);
    this.tabs.push(['sso', 'SSO Policy']);
    this.tabs.push(['tickets', 'Tickets']);
    this.tabs.push(['userattr', 'Username Attribute']);
    this.tabs.push(['multiauth', 'Multifactor']);
    this.tabs.push(['proxy', 'Proxy']);
    this.tabs.push(['properties', 'Properties']);
    this.tabs.push(['advanced', 'Advanced']);
  }

  reset() {
    for (const fg of Array.from(this.data.formMap.values())) {
      fg.reset(fg.formMap());
    }
  }

  touched(): boolean {
    if (this.imported) {
      return true;
    }
    for (const fg of Array.from(this.data.formMap.values())) {
      if (fg.touched) {
        return true;
      }
    }
    return false;
  }

  dirty(): boolean {
    if (this.imported || this.created) {
      return true;
    }
    if (this.data.formMap) {
      for (const fg of Array.from(this.data.formMap.values())) {
        if (fg.dirty) {
          return true;
        }
      }
    }
    return false;
  }
}
