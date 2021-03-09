import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabSamlSigningComponent} from './tab-saml-signing.component';

describe('TabSamlSigningComponent', () => {
  let component: TabSamlSigningComponent;
  let fixture: ComponentFixture<TabSamlSigningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSamlSigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSamlSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
