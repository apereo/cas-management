import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamlMetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  let component: SamlMetadataComponent;
  let fixture: ComponentFixture<SamlMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
