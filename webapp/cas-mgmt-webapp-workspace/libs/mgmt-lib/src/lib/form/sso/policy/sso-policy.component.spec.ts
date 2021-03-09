import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SsoPolicyComponent} from './sso-policy.component';

describe('SsoPolicyComponent', () => {
  let component: SsoPolicyComponent;
  let fixture: ComponentFixture<SsoPolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
