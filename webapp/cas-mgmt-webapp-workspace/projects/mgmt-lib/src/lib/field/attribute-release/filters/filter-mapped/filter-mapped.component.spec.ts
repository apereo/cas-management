import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterMappedComponent } from './filter-mapped.component';

describe('MappedComponent', () => {
  let component: FilterMappedComponent;
  let fixture: ComponentFixture<FilterMappedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMappedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
