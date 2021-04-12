import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubmitsComponent } from './submits.component';

describe('SubmitsComponent', () => {
  let component: SubmitsComponent;
  let fixture: ComponentFixture<SubmitsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
