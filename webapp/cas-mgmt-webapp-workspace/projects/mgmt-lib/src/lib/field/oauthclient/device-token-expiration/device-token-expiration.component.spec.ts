import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceTokenExpirationComponent } from './device-token-expiration.component';

describe('DeviceTokenExpirationComponent', () => {
  let component: DeviceTokenExpirationComponent;
  let fixture: ComponentFixture<DeviceTokenExpirationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTokenExpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTokenExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
