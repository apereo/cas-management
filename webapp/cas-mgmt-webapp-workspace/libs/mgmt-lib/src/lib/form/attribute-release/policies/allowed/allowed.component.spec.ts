import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AllowedComponent} from './allowed.component';

describe('AllowedComponent', () => {
  let component: AllowedComponent;
  let fixture: ComponentFixture<AllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
