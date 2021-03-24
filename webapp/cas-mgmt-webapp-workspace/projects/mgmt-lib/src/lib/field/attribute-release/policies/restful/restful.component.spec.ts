import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RestfulComponent } from './restful.component';

describe('RestfulComponent', () => {
  let component: RestfulComponent;
  let fixture: ComponentFixture<RestfulComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
