import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceTokenExpirationComponent} from './device-token-expiration.component';

describe('DeviceTokenExpirationComponent', () => {
  let component: DeviceTokenExpirationComponent;
  let fixture: ComponentFixture<DeviceTokenExpirationComponent>;

  beforeEach(async(() => {
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
