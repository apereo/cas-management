import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtLibComponent } from './mgmt-lib.component';

describe('MgmtLibComponent', () => {
  let component: MgmtLibComponent;
  let fixture: ComponentFixture<MgmtLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmtLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
