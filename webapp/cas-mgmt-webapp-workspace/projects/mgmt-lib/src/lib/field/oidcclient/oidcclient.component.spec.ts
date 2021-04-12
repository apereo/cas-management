import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OidcclientComponent } from './oidcclient.component';

describe('OidcclientComponent', () => {
  let component: OidcclientComponent;
  let fixture: ComponentFixture<OidcclientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OidcclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
