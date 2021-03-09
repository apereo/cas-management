import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ServiceIdComponent} from './service-id.component';

describe('RedirectUriComponent', () => {
  let component: ServiceIdComponent;
  let fixture: ComponentFixture<ServiceIdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
