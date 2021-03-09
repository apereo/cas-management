import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RevertComponent} from './revert.component';

describe('RevertComponent', () => {
  let component: RevertComponent;
  let fixture: ComponentFixture<RevertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RevertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
