import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodeExpirationComponent } from './code-expiration.component';

describe('CodeExpirationComponent', () => {
  let component: CodeExpirationComponent;
  let fixture: ComponentFixture<CodeExpirationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeExpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
