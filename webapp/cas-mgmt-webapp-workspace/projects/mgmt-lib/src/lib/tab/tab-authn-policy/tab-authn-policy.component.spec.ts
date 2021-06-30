import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabAuthnPolicyComponent } from './tab-authn-policy.component';

describe('TabAuthnPolicyComponent', () => {
  let component: TabAuthnPolicyComponent;
  let fixture: ComponentFixture<TabAuthnPolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAuthnPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAuthnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
