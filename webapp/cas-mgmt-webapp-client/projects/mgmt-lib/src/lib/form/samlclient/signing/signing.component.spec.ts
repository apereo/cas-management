import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningComponent } from './signing.component';

describe('SigningComponent', () => {
  let component: SigningComponent;
  let fixture: ComponentFixture<SigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
