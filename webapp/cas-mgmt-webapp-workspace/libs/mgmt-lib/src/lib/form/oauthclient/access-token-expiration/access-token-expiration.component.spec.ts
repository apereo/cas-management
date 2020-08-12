import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccessTokenExpirationComponent} from './access-token-expiration.component';

describe('AccessTokenExpirationComponent', () => {
  let component: AccessTokenExpirationComponent;
  let fixture: ComponentFixture<AccessTokenExpirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessTokenExpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
