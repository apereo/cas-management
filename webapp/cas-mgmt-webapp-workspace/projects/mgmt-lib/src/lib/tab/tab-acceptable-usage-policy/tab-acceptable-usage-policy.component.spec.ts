/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabAcceptableUsagePolicyComponent } from './tab-acceptable-usage-policy.component';

describe('TabAcceptableUsagePolicyComponent', () => {
  let component: TabAcceptableUsagePolicyComponent;
  let fixture: ComponentFixture<TabAcceptableUsagePolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [TabAcceptableUsagePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAcceptableUsagePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
