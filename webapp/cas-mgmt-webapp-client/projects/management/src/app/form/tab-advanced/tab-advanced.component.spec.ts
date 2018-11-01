/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabAdvancedComponent } from './tab-advanced.component';
import {DataRecord, SharedModule} from 'mgmt-lib';
import {PubkeyComponent} from 'mgmt-lib/lib/form/pubkey/pubkey.component';
import {EvalorderComponent} from 'mgmt-lib/lib/form/evalorder/evalorder.component';
import {RequiredHandlersComponent} from 'mgmt-lib/lib/form/reqhandlers/reqhandlers.component';

describe('TabAdvancedComponent', () => {
  let component: TabAdvancedComponent;
  let fixture: ComponentFixture<TabAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ TabAdvancedComponent, PubkeyComponent, EvalorderComponent, RequiredHandlersComponent ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
