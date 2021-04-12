import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabDelegatedComponent } from './tab-delegated.component';

describe('TabDelegatedComponent', () => {
  let component: TabDelegatedComponent;
  let fixture: ComponentFixture<TabDelegatedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDelegatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDelegatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
