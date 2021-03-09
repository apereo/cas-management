import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FriendlyComponent} from './friendly.component';

describe('FriendlyComponent', () => {
  let component: FriendlyComponent;
  let fixture: ComponentFixture<FriendlyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
