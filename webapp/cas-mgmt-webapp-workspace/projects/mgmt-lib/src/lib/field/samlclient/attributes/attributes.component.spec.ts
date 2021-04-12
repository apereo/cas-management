import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttributeNameFormatsComponent } from './attributes.component';

describe('AttributesComponent', () => {
  let component: AttributeNameFormatsComponent;
  let fixture: ComponentFixture<AttributeNameFormatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeNameFormatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeNameFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
