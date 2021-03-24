import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SamlOptionalComponent } from './optional.component';

describe('OptionalComponent', () => {
  let component: SamlOptionalComponent;
  let fixture: ComponentFixture<SamlOptionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlOptionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
