import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IdtokenComponent} from './idtoken.component';

describe('IdtokenComponent', () => {
  let component: IdtokenComponent;
  let fixture: ComponentFixture<IdtokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdtokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
