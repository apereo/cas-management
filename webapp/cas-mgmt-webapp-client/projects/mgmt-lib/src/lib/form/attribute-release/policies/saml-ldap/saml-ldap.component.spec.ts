import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamlLdapComponent } from './mapped.component';

describe('MappedComponent', () => {
  let component: SamlLdapComponent;
  let fixture: ComponentFixture<SamlLdapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlLdapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlLdapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
