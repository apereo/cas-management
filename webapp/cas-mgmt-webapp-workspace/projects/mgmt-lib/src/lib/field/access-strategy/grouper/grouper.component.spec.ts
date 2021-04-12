import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrouperComponent } from './grouper.component';

describe('GrouperComponent', () => {
  let component: GrouperComponent;
  let fixture: ComponentFixture<GrouperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
