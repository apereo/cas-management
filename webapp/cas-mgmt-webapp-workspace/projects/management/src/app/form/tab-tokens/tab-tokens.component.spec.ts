import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabTokensComponent} from './tab-tokens.component';

describe('TabTokensComponent', () => {
  let component: TabTokensComponent;
  let fixture: ComponentFixture<TabTokensComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
