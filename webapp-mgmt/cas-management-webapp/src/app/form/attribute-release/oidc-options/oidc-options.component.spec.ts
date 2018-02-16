import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcOptionsComponent } from './oidc-options.component';

describe('OidcOptionsComponent', () => {
  let component: OidcOptionsComponent;
  let fixture: ComponentFixture<OidcOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OidcOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
