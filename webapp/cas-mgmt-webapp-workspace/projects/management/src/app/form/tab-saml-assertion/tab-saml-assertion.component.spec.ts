import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabSamlAssertionComponent} from './tab-saml-assertion.component';

describe('TabSamlAssertionComponent', () => {
  let component: TabSamlAssertionComponent;
  let fixture: ComponentFixture<TabSamlAssertionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSamlAssertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSamlAssertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
