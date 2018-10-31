/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabLogoutComponent } from './tab-logout.component';
import {DataRecord, Messages, SharedModule} from 'mgmt-lib';
import {LogoutComponent} from 'mgmt-lib/lib/form/logout/logout.component';
import {LogouttypeevalComponent} from 'mgmt-lib/lib/form/logouttypeeval/logouttypeeval.component';

describe('TabLogoutComponent', () => {
  let component: TabLogoutComponent;
  let fixture: ComponentFixture<TabLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ TabLogoutComponent, LogoutComponent, LogouttypeevalComponent ],
      providers: [ Messages, DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
