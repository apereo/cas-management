import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabSamlAttributesComponent } from './tab-saml-attributes.component';

describe('TabSamlAttributesComponent', () => {
  let component: TabSamlAttributesComponent;
  let fixture: ComponentFixture<TabSamlAttributesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSamlAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSamlAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
