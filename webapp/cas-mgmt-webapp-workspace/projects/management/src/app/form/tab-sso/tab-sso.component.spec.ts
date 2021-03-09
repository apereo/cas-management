import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabSsoComponent} from './tab-sso.component';

describe('TabSsoComponent', () => {
  let component: TabSsoComponent;
  let fixture: ComponentFixture<TabSsoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
