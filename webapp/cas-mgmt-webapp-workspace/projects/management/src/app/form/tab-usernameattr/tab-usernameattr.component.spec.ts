/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabUsernameattrComponent } from './tab-usernameattr.component';
import {DataRecord, SharedModule} from 'mgmt-lib';
import {UidattrsComponent} from 'mgmt-lib/lib/form/uidattrs/uidattrs.component';

describe('TabUsernameattrComponent', () => {
  let component: TabUsernameattrComponent;
  let fixture: ComponentFixture<TabUsernameattrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ TabUsernameattrComponent, UidattrsComponent ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUsernameattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
