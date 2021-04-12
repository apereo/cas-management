/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabProxyComponent } from './tab-proxy.component';
import {ProxyComponent} from '@apereo/mgmt-lib/src/lib/field';
import {DataRecord} from '@apereo/mgmt-lib/src/lib/form';

describe('TabProxyComponent', () => {
  let component: TabProxyComponent;
  let fixture: ComponentFixture<TabProxyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TabProxyComponent, ProxyComponent ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
