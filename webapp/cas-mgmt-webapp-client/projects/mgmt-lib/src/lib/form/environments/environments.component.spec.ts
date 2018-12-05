import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentsComponent } from './environments.component';

describe('EnvironmentsComponent', () => {
  let component: EnvironmentsComponent;
  let fixture: ComponentFixture<EnvironmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
