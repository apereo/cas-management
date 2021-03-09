import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CacheComponent} from './sessions.component';

describe('SessionsComponent', () => {
  let component: CacheComponent;
  let fixture: ComponentFixture<CacheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
