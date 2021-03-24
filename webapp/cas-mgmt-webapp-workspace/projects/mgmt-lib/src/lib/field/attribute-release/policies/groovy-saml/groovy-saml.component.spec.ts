import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroovySamlComponent } from './groovy-saml.component';

describe('GroovySamlComponent', () => {
  let component: GroovySamlComponent;
  let fixture: ComponentFixture<GroovySamlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroovySamlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroovySamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
