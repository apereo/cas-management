import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSamlMetadataComponent } from './tab-saml-metadata.component';

describe('TabSamlMetadataComponent', () => {
  let component: TabSamlMetadataComponent;
  let fixture: ComponentFixture<TabSamlMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSamlMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSamlMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
