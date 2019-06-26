import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTokenExpirationComponent } from './refresh-token-expiration.component';

describe('RefreshTokenExpirationComponent', () => {
  let component: RefreshTokenExpirationComponent;
  let fixture: ComponentFixture<RefreshTokenExpirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshTokenExpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTokenExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
