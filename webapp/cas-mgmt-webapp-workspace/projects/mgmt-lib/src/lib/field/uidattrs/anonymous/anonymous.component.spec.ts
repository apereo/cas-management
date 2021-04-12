import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnonymousComponent } from './anonymous.component';

describe('AnonymousComponent', () => {
  let component: AnonymousComponent;
  let fixture: ComponentFixture<AnonymousComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
