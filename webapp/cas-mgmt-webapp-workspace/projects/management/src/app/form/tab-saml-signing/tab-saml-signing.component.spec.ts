import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabSamlSigningComponent} from './tab-saml-signing.component';

describe('TabSamlSigningComponent', () => {
  let component: TabSamlSigningComponent;
  let fixture: ComponentFixture<TabSamlSigningComponent>;

  beforeEach(async(() => {
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
