import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnknownComponent } from './unknown.component';

describe('UnknownComponent', () => {
  let component: UnknownComponent;
  let fixture: ComponentFixture<UnknownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
