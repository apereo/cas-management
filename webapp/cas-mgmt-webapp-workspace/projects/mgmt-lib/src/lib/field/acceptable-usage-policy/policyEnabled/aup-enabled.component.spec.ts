/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AcceptableUsagePolicyEnabledComponent } from './aup-enabled.component';

describe('PolicyEnabledComponent', () => {
  let component: AcceptableUsagePolicyEnabledComponent;
  let fixture: ComponentFixture<AcceptableUsagePolicyEnabledComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [AcceptableUsagePolicyEnabledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptableUsagePolicyEnabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
