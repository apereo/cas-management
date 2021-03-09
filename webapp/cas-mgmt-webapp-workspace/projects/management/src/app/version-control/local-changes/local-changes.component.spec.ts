import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LocalChangesComponent} from './local-changes.component';

describe('LocalChangesComponent', () => {
  let component: LocalChangesComponent;
  let fixture: ComponentFixture<LocalChangesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
