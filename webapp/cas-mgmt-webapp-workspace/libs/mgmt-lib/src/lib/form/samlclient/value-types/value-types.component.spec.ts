import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValueTypesComponent} from './value-types.component';

describe('ValueTypesComponent', () => {
  let component: ValueTypesComponent;
  let fixture: ComponentFixture<ValueTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
