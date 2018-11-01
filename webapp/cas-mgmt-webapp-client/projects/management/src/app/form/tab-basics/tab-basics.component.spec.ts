/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabBasicsComponent } from './tab-basics.component';
import {DataRecord, SharedModule} from 'mgmt-lib';
import {ServicenameComponent} from 'mgmt-lib/lib/form/servicename/servicename.component';
import {ThemeidComponent} from 'mgmt-lib/lib/form/themeid/themeid.component';
import {ServicedescComponent} from 'mgmt-lib/lib/form/servicedesc/servicedesc.component';
import {LogoComponent} from 'mgmt-lib/lib/form/logo/logo.component';
import {LinkrefsComponent} from 'mgmt-lib/lib/form/linkrefs/linkrefs.component';
import {EnabledComponent} from 'mgmt-lib/lib/form/enabled/enabled.component';
import {ServiceIdComponent} from 'mgmt-lib/lib/form/service-id/service-id.component';

describe('TabBasicsComponent', () => {
  let component: TabBasicsComponent;
  let fixture: ComponentFixture<TabBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [
        TabBasicsComponent,
        ServiceIdComponent,
        ServicenameComponent,
        ServicedescComponent,
        LogoComponent,
        ThemeidComponent,
        LinkrefsComponent,
        EnabledComponent
      ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
