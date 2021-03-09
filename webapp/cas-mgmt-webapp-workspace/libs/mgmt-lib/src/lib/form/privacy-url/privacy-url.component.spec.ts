import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PrivacyUrlComponent} from './privacy-url.component';

describe('PrivacyUrlComponent', () => {
  let component: PrivacyUrlComponent;
  let fixture: ComponentFixture<PrivacyUrlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
