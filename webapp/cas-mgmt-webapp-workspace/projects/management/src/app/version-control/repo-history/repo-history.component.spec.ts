import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RepoHistoryComponent} from './repo-history.component';

describe('RepoHistoryComponent', () => {
  let component: RepoHistoryComponent;
  let fixture: ComponentFixture<RepoHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
