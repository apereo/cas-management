import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtCardComponent } from './mgmt-card.component';

describe('MgmtCardComponent', () => {
  let component: MgmtCardComponent;
  let fixture: ComponentFixture<MgmtCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmtCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
