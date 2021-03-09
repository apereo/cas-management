import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabSamlMetadataComponent} from './tab-saml-metadata.component';

describe('TabSamlMetadataComponent', () => {
  let component: TabSamlMetadataComponent;
  let fixture: ComponentFixture<TabSamlMetadataComponent>;

  beforeEach(waitForAsync(() => {
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
