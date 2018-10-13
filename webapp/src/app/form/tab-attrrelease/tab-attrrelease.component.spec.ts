/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabAttrreleaseComponent } from './tab-attrrelease.component';
import {Messages} from '../../messages';
import {Data} from '../data';
import {SharedModule} from '../../shared/shared.module';
import {ChecksComponent} from '../attribute-release/checks/checks.component';
import {FiltersComponent} from '../attribute-release/filters/filters.component';
import {PoliciesComponent} from '../attribute-release/policies/policies.component';
import {PrincipalRepoComponent} from '../attribute-release/principal-repo/principal-repo.component';
import {WsfedattrrelpoliciesComponent} from '../wsfedattrrelpolocies/wsfedattrrelpolicies.component';

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
      providers: [ Messages, Data ]
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
