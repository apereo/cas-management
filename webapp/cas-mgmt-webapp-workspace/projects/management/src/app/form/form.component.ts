import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  FormService,
  UserService,
  SpinnerService,
  AppConfigService,
  AbstractRegisteredService,
  TabsComponent,
  ImportService, ControlsService, ServiceForm, SubmissionsService
} from '@apereo/mgmt-lib';
import {FormArray, FormGroup} from '@angular/forms';

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

export class FormComponent implements OnInit, OnDestroy, OnChanges {

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
              private service: FormService,
              private importService: ImportService,
              private submissionService: SubmissionsService,
              private location: Location,
              public app: AppConfigService,
              public controls: ControlsService,
              public userService: UserService,
              private breakpointObserver: BreakpointObserver,
              private spinner: SpinnerService) {
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
    this.service.typeChange.subscribe(() => this.setNav());
    this.controls.resetButtons();
    this.controls.showEdit = this.showEdit();
    this.subscriptions.push(this.controls.save.subscribe(() => this.save()));
    this.subscriptions.push(this.controls.reset.subscribe(() => this.reset()));
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Check if form changed to show edit buttons.
   *
   * @param changes - SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    this.controls.showEdit = this.showEdit();
    console.log('changes', this.controls.showEdit);
  }

  /**
   * Saves the current changes for the service.
   */
  save() {
    if (this.validate() && this.map()) {
      this.service.saveService(this.service.registeredService)
        .subscribe(
          resp => this.handleSave(resp),
          () => this.handleNotSaved()
        );
    }
  }

  /**
   * Handles the return of a successful save of the service.
   *
   * @param id - assigned id of the service returned from the server.
   */
  handleSave(id: number) {
    const hasIdAssignedAlready = this.service.registeredService.id && this.service.registeredService.id > 0;

    if (!hasIdAssignedAlready && id && id !== -1) {
      this.service.registeredService.id = id;
      this.app.showSnackBar('Service has been added successfully.');
    } else {
      this.app.showSnackBar('Service has been successfully updated.');
    }

    this.service.registeredService.id = id;
    if (this.imported && this.importService.submissionFile) {
      this.submissionService.added(this.importService.submissionFile)
        .subscribe(() => {
          this.location.back();
        });
    } else {
      this.location.back();
    }
    this.controls.gitStatus();
  }

  /**
   * Handles the return of an unsuccessful save of a service.
   */
  handleNotSaved() {
    this.app.showSnackBar('An error has occurred while attempting to save the service. Please try again later.');
  }

  /**
   * Loads the passed service in to the component forms.
   *
   * @param service - AbstractRegisteredService
   */
  loadService(service: AbstractRegisteredService) {
    this.service.registeredService = service;
    this.service.form = new ServiceForm(service);
    this.service.form.statusChanges.subscribe((s) => {
      console.log('form status changes', s);
      this.controls.showEdit = this.showEdit();
    });
    this.setNav();
    setTimeout(() => {
      if (service.id < 0) {
        this.markDirty();
      }}, 10);
  }

  /**
   * Returns true if form is new or modified to display save controls.
   */
  showEdit(): boolean {
    return this.dirty() || this.service?.registeredService?.id < 0;
  }

  /**
   * Sets the tabs that are displayed in the component based on service types.
   */
  setNav() {
    this.tabList = [];
    this.tabList.push(['basics', 'Basics']);
    if (this.app.isSaml(this.service.registeredService)) {
      this.tabList.push(['saml-metadata', 'Metadata']);
      this.tabList.push(['saml-assertion', 'Assertion']);
      this.tabList.push(['saml-attributes', 'Attributes']);
      this.tabList.push(['saml-encryption', 'Encryption']);
      this.tabList.push(['saml-signing', 'Signing']);
    }
    if (this.app.isOauth(this.service.registeredService) || this.app.isOidc(this.service.registeredService)) {
      this.tabList.push(['oauth', 'Client']);
      this.tabList.push(['tokens', 'Tokens']);
    }
    if (this.app.isOidc(this.service.registeredService)) {
      this.tabList.push(['oidc', 'OIDC']);
    }
    if (this.app.isWsFed(this.service.registeredService)) {
      this.tabList.push(['wsfed', 'WS Fed']);
    }
    this.tabList.push(['contacts', 'Contacts']);
    this.tabList.push(['logout', 'Logout']);
    if (this.app.isOidc(this.service.registeredService)) {
      this.tabList.push(['scopes', 'Scopes']);
    } else if (this.app.isWsFed(this.service.registeredService)) {
      this.tabList.push(['claims', 'Claims']);
    } else {
      this.tabList.push(['attrRelease', 'Attribute Release']);
    }
    this.tabList.push(['accessstrategy', 'Access Strategy']);
    this.tabList.push(['delegated', 'Delegated Authentication']);
    this.tabList.push(['sso', 'SSO Policy']);
    this.tabList.push(['authnPolicy', 'Authentication Policy']);
    this.tabList.push(['acceptableUsagePolicy', 'Acceptable Usage Policy']);
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
    if (this.service.form.invalid) {
      this.touch(this.service.form);
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
    this.makeDirty(this.service.form);
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
    if (this.service.form.valid && this.service.form.touched) {
      this.service.form.map();
      touched = true;
    }
    return touched;
  }

  /**
   * Resets all the form controls to what they were when the service was loaded.
   */
  reset() {
    this.service.form.reset();
  }

  /**
   * Returns true if any control in the form was touched by the user.
   */
  touched(): boolean {
    if (this.service.form.touched) {
      return true;
    }
    return false;
  }

  /**
   * Returns true if the user changed any value in the form.
   */
  dirty(): boolean {
    console.log('dirty', this.service.form.dirty);
    if (this.service.form.dirty) {
      return true;
    }
    return false;
  }
}
