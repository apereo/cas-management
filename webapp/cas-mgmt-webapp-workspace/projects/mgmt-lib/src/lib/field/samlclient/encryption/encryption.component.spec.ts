import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EncryptionComponent } from './encryption.component';

describe('EncryptionComponent', () => {
  let component: EncryptionComponent;
  let fixture: ComponentFixture<EncryptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
