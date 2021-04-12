import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PullComponent } from './pull.component';

describe('PullComponent', () => {
  let component: PullComponent;
  let fixture: ComponentFixture<PullComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PullComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
