import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcceptableUsagePolicyComponent } from './acceptable-usage-policy.component';

describe('Acceptable Usage Policy Component', () => {
  let component: AcceptableUsagePolicyComponent;
  let fixture: ComponentFixture<AcceptableUsagePolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptableUsagePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptableUsagePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
