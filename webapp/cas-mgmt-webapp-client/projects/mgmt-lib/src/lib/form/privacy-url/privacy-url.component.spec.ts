import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyUrlComponent } from './privacy-url.component';

describe('PrivacyUrlComponent', () => {
  let component: PrivacyUrlComponent;
  let fixture: ComponentFixture<PrivacyUrlComponent>;

  beforeEach(async(() => {
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
