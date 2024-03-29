import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JwksComponent } from './jwks.component';

describe('JwksComponent', () => {
  let component: JwksComponent;
  let fixture: ComponentFixture<JwksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JwksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
