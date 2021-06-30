import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  FormService,
  UserService,
  AppConfigService,
  AbstractRegisteredService,
  TabsComponent,
  ImportService, ServiceForm
} from '@apereo/mgmt-lib';
import {FormArray, FormGroup} from '@angular/forms';
import {ControlsService} from '../project-share/controls/controls.service';
import {SubmitComponent} from '../project-share/submit/submit.component';
import {MatDialog} from '@angular/material/dialog';
import {RegisterService} from '../core/register.servivce';

/**
 * Component to display/update a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, OnDestroy {

  id: string;
  view: boolean;
  created: false;

  tabList: Array<string[]> = [];

  @ViewChild(TabsComponent, {static: true})
  tabs: TabsComponent;

  subscriptions: Subscription[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  imported = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: RegisterService,
              private form: FormService,
              private importService: ImportService,
              private location: Location,
              public app: AppConfigService,
              public controls: ControlsService,
              public userService: UserService,
              private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog) {
    this.controls.title = 'Service';
    this.controls.icon = 'article';
  }

  /**
   * Starts the component by loading the service passed in from the resolver.
   */
  ngOnInit() {
    this.view = this.route.snapshot.data.view;
    this.imported = this.route.snapshot.data.import;
    this.created = this.route.snapshot.data.created;
    this.route.data
      .subscribe((data: { resp: AbstractRegisteredService }) => {
        if (data.resp) {
          this.loadService(data.resp);
        }
      });
    this.controls.resetButtons();
    this.controls.showEdit = true;
    this.subscriptions.push(this.controls.save.subscribe(() => this.save()));
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Saves the service and submits a pending request.
   */
  save() {
    if (this.validate() && this.map()) {
      const id = this.route.snapshot.params.id;
      if ((id && id.includes('json')) || this.form.registeredService.id > -1) {
        this.submitEdit();
      } else {
        this.submitNew();
      }
    }
  }

  /**
   * Submits a new service to be added.
   */
  submitNew() {
    this.service.submitService(this.form.registeredService)
      .subscribe(() => this.showSubmit());
  }

  /**
   * Submits changes to a service or pending submission.
   */
  submitEdit() {
    this.service.saveService(this.form.registeredService, this.route.snapshot.params.id)
      .subscribe(() => this.showSubmit());
  }

  /**
   * Dialog to inform the user of the submission process.
   */
  showSubmit() {
    this.dialog.open(SubmitComponent, {
      data: ['changeService', ''],
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(() => {
      this.router.navigate(['pending']).then();
    });
  }

  /**
   * Loads the passed service into the form.
   */
  loadService(service: AbstractRegisteredService) {
    this.form.registeredService = service;
    this.form.form = new ServiceForm(service);
    this.setNav();
  }

  /**
   * Sets the tabs that are displayed in the component based on service types.
   */
  setNav() {
    this.tabList = [];
    this.tabList.push(['basics', 'Basics']);
    if (this.app.isSaml(this.form.registeredService)) {
      this.tabList.push(['saml-metadata', 'Metadata']);
      this.tabList.push(['saml-assertion', 'Assertion']);
      this.tabList.push(['saml-attributes', 'Attributes']);
      this.tabList.push(['saml-encryption', 'Encryption']);
      this.tabList.push(['saml-signing', 'Signing']);
    }
    if (this.app.isOauth(this.form.registeredService) || this.app.isOidc(this.form.registeredService)) {
      this.tabList.push(['oauth', 'Client']);
      this.tabList.push(['tokens', 'Tokens']);
    }
    if (this.app.isOidc(this.form.registeredService)) {
      this.tabList.push(['oidc', 'OIDC']);
    }
    if (this.app.isWsFed(this.form.registeredService)) {
      this.tabList.push(['wsfed', 'WS Fed']);
    }
    this.tabList.push(['contacts', 'Contacts']);
    this.tabList.push(['logout', 'Logout']);
    if (this.app.isOidc(this.form.registeredService)) {
      this.tabList.push(['scopes', 'Scopes']);
    } else if (this.app.isWsFed(this.form.registeredService)) {
      this.tabList.push(['claims', 'Claims']);
    } else {
      this.tabList.push(['attrRelease', 'Attribute Release']);
    }
    this.tabList.push(['accessstrategy', 'Access Strategy']);
    this.tabList.push(['delegated', 'Delegated Authentication']);
    this.tabList.push(['sso', 'SSO Policy']);
    this.tabList.push(['authnPolicy', 'Authentication Policy']);
    this.tabList.push(['tickets', 'Tickets']);
    this.tabList.push(['userattr', 'Username Attribute']);
    this.tabList.push(['multiauth', 'Multifactor']);
    this.tabList.push(['proxy', 'Proxy']);
    this.tabList.push(['properties', 'Properties']);
    this.tabList.push(['advanced', 'Advanced']);
    this.tabs.navTo('basics');
  }

  /**
   * Returns true if the form data is valid.
   */
  validate(): boolean {
    if (this.form.form?.invalid) {
      this.touch(this.form?.form);
      return false;
    }
    return true;
  }

  /**
   * Programmatically ensures all controls in the passed form group are marked as touch for validation.
   *
   * @param group - form group
   */
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

  /**
   * Marks all form groups in the form as being dirty.
   */
  markDirty() {
    this.makeDirty(this.form?.form);
  }

  /**
   * Marks all controls in the passed form group as being dirty.
   *
   * @param group - form group
   */
  makeDirty(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach(k => {
      const control = group.get(k);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.makeDirty(control);
      } else {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }

  /**
   * Maps the form to the service int the DataRecord.
   */
  map(): boolean {
    let touched: boolean = this.created;
    if (this.form.form?.valid && this.form.form?.touched) {
      this.form.form?.map();
      touched = true;
    }
    return touched;
  }

  /**
   * Resets all the form controls to what they were when the service was loaded.
   */
  reset() {
    this.form.form?.reset();
  }

  /**
   * Returns true if any control in the form was touched by the user.
   */
  touched(): boolean {
    if (this.form.form?.touched) {
      return true;
    }
    return false;
  }

  /**
   * Returns true if the user changed any value in the form.
   */
  dirty(): boolean {
    if (this.form.form?.dirty) {
      return true;
    }
    return false;
  }
}
