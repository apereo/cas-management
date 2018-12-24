import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitsComponent } from './submits.component';

describe('SubmitsComponent', () => {
  let component: SubmitsComponent;
  let fixture: ComponentFixture<SubmitsComponent>;

  beforeEach(async(() => {
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
