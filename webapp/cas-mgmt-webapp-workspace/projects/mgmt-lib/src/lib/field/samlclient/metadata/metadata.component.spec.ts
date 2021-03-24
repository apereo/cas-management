import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SamlMetadataComponent } from './metadata.component';

describe('MetadataComponent', () => {
  let component: SamlMetadataComponent;
  let fixture: ComponentFixture<SamlMetadataComponent>;

  beforeEach(waitForAsync(() => {
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
