import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSamlEncryptionComponent } from './tab-saml-encryption.component';

describe('TabSamlEncryptionComponent', () => {
  let component: TabSamlEncryptionComponent;
  let fixture: ComponentFixture<TabSamlEncryptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSamlEncryptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSamlEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
