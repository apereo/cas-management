import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpirationComponent } from './expiration.component';

describe('ExpirationComponent', () => {
  let component: ExpirationComponent;
  let fixture: ComponentFixture<ExpirationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
