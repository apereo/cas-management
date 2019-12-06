import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormService} from './form.service';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/index';
import {finalize, map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DataRecord, MgmtFormGroup} from 'mgmt-lib';
import {UserService, SpinnerService} from 'shared-lib';
import {
  AbstractRegisteredService,
  OAuthRegisteredService,
  OidcRegisteredService,
  RegexRegisteredService,
  SamlRegisteredService,
  WSFederationRegisterdService,
} from 'domain-lib';
import {ImportService} from '../registry/import/import.service';
import {BaseFormComponent} from 'mgmt-lib';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  id: string;
  view: boolean;
  created: false;

  tabs: Array<string[]> = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  imported = false;

  @ViewChild(BaseFormComponent, {static: true})
  baseForm: BaseFormComponent;

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
        }
      });
    this.data.typeChange.subscribe(() => this.setNav());
  }

  save() {
    if (this.baseForm.validate() && this.baseForm.mapForm()) {
      this.service.saveService(this.data.service)
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
    setTimeout(() => {
      if (this.data.service.id < 0) {
        this.baseForm.markDirty();
      }}, 10);
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

  showEdit() {
    return this.baseForm.dirty() || this.data.service.id < 0;
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
      this.tabs.push(['scopes', 'Scopes']);
    } else if (this.isWsFed()) {
      this.tabs.push(['claims', 'Claims']);
    } else {
      this.tabs.push(['attrRelease', 'Attribute Release']);
    }
    this.tabs.push(['accessstrategy', 'Access Srategy']);
    this.tabs.push(['delegated', 'Delegated Authentication']);
    this.tabs.push(['sso', 'SSO Policy']);
    this.tabs.push(['tickets', 'Tickets']);
    this.tabs.push(['userattr', 'Username Attribute']);
    this.tabs.push(['multiauth', 'Multifactor']);
    this.tabs.push(['proxy', 'Proxy']);
    this.tabs.push(['properties', 'Properties']);
    this.tabs.push(['advanced', 'Advanced']);
    this.baseForm.navTo('basics');
  }
}
