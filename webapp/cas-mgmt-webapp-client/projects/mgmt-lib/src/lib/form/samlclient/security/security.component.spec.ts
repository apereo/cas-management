import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamlSecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  let component: SamlSecurityComponent;
  let fixture: ComponentFixture<SamlSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
