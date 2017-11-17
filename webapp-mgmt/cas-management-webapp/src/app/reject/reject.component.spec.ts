import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectComponent } from './reject.component';

describe('RejectComponent', () => {
  let component: RejectComponent;
  let fixture: ComponentFixture<RejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
