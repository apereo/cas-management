import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptComponent } from './accept.component';

describe('AcceptComponent', () => {
  let component: AcceptComponent;
  let fixture: ComponentFixture<AcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
