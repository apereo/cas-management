import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AuthenticationPolicyComponent} from "@apereo/mgmt-lib/src";

describe('AuthenticationPolicyComponent', () => {
  let component: AuthenticationPolicyComponent;
  let fixture: ComponentFixture<AuthenticationPolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationPolicyComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
