import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {SamlIdpComponent} from './saml-idp.component';


describe('SamlIdpComponent', () => {
  let component: SamlIdpComponent;
  let fixture: ComponentFixture<SamlIdpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlIdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlIdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
