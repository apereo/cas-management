import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONComponent } from './json.component';

describe('JsonComponent', () => {
  let component: JSONComponent;
  let fixture: ComponentFixture<JSONComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSONComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
