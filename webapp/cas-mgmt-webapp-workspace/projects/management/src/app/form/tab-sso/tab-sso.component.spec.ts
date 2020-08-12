import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSsoComponent} from './tab-sso.component';

describe('TabSsoComponent', () => {
  let component: TabSsoComponent;
  let fixture: ComponentFixture<TabSsoComponent>;

  beforeEach(async(() => {
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
