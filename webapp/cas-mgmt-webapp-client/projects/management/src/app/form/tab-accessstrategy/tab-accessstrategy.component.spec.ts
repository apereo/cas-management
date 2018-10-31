/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabAccessstrategyComponent } from './tab-accessstrategy.component';
import {DataRecord, Messages, SharedModule} from 'mgmt-lib';
import {AccessStrategyComponent} from 'mgmt-lib/lib/form/access-strategy/access-strategy.component';
import {AttributemappingComponent} from 'mgmt-lib/lib/form/attributemapping/attributemapping.component';

describe('TabAccessstrategyComponent', () => {
  let component: TabAccessstrategyComponent;
  let fixture: ComponentFixture<TabAccessstrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ TabAccessstrategyComponent, AccessStrategyComponent, AttributemappingComponent ],
      providers: [ DataRecord, Messages ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAccessstrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
