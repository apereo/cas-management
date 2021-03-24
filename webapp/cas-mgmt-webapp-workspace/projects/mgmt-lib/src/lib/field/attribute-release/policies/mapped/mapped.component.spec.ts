import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MappedComponent } from './mapped.component';

describe('MappedComponent', () => {
  let component: MappedComponent;
  let fixture: ComponentFixture<MappedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MappedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
