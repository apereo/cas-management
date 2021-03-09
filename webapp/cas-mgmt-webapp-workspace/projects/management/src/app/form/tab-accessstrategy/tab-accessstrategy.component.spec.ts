/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TabAccessstrategyComponent} from './tab-accessstrategy.component';
import {DataRecord, SharedModule} from 'mgmt-lib';

describe('TabAccessstrategyComponent', () => {
  let component: TabAccessstrategyComponent;
  let fixture: ComponentFixture<TabAccessstrategyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ TabAccessstrategyComponent ],
      providers: [ DataRecord ]
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
