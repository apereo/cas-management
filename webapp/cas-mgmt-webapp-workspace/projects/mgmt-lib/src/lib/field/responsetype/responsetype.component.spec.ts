import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponsetypeComponent } from './responsetype.component';

describe('ResponsetypeComponent', () => {
  let component: ResponsetypeComponent;
  let fixture: ComponentFixture<ResponsetypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
