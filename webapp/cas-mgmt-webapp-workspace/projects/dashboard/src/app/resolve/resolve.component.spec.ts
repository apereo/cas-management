import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ResolveComponent} from './resolve.component';

describe('ResolveComponent', () => {
  let component: ResolveComponent;
  let fixture: ComponentFixture<ResolveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
