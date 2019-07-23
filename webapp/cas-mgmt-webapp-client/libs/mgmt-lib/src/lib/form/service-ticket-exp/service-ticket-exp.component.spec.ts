import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTicketExpComponent } from './service-ticket-exp.component';

describe('ServiceTicketExpComponent', () => {
  let component: ServiceTicketExpComponent;
  let fixture: ComponentFixture<ServiceTicketExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTicketExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTicketExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
