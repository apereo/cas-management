import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DelegatedComponent} from './delegated.component';

describe('DelegatedComponent', () => {
  let component: DelegatedComponent;
  let fixture: ComponentFixture<DelegatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
