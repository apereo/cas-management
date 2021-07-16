/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AcceptableUsagePolicyTextComponent } from './aup-text.component';

describe('AcceptableUsageTextComponent', () => {
  let component: AcceptableUsagePolicyTextComponent;
  let fixture: ComponentFixture<AcceptableUsagePolicyTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [AcceptableUsagePolicyTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptableUsagePolicyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
