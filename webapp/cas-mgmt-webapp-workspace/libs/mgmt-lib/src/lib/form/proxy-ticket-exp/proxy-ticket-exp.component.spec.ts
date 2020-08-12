import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProxyTicketExpComponent} from './proxy-ticket-exp.component';

describe('ProxyTicketExpComponent', () => {
  let component: ProxyTicketExpComponent;
  let fixture: ComponentFixture<ProxyTicketExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyTicketExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyTicketExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
