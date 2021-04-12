import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeoutComponent } from './timeout.component';

describe('TimeoutComponent', () => {
  let component: TimeoutComponent;
  let fixture: ComponentFixture<TimeoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
