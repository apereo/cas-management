/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AcceptableUsagePolicyMessageCode } from './aup-messagecode.component';

describe('AcceptableUsagePolicyMessageCode', () => {
  let component: AcceptableUsagePolicyMessageCode;
  let fixture: ComponentFixture<AcceptableUsagePolicyMessageCode>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [AcceptableUsagePolicyMessageCode ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptableUsagePolicyMessageCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
