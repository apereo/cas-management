/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabAttrreleaseComponent } from './tab-attrrelease.component';
import {DataRecord, Messages, SharedModule} from 'mgmt-lib';
import {ChecksComponent} from 'mgmt-lib/lib/form/attribute-release/checks/checks.component';
import {FiltersComponent} from 'mgmt-lib/lib/form/attribute-release/filters/filters.component';
import {PoliciesComponent} from 'mgmt-lib/lib/form/attribute-release/policies/policies.component';
import {PrincipalRepoComponent} from 'mgmt-lib/lib/form/attribute-release/principal-repo/principal-repo.component';
import {WsfedattrrelpoliciesComponent} from 'mgmt-lib/lib/form/wsfedattrrelpolocies/wsfedattrrelpolicies.component';

describe('TabAttrreleaseComponent', () => {
  let component: TabAttrreleaseComponent;
  let fixture: ComponentFixture<TabAttrreleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [
        TabAttrreleaseComponent,
        ChecksComponent,
        FiltersComponent,
        PoliciesComponent,
        PrincipalRepoComponent,
        WsfedattrrelpoliciesComponent
      ],
      providers: [ Messages, DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAttrreleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
