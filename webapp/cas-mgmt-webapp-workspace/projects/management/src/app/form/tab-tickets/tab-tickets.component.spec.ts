import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabTicketsComponent} from './tab-tickets.component';

describe('TabTicketsComponent', () => {
  let component: TabTicketsComponent;
  let fixture: ComponentFixture<TabTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
