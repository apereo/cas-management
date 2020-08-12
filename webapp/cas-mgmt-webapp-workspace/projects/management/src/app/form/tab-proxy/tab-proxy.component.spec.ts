/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TabProxyComponent} from './tab-proxy.component';
import {DataRecord, SharedModule} from 'mgmt-lib';
import {ProxyComponent} from 'mgmt-lib/lib/form/proxy/proxy.component';

describe('TabProxyComponent', () => {
  let component: TabProxyComponent;
  let fixture: ComponentFixture<TabProxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
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
