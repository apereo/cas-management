import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlyComponent } from './friendly.component';

describe('FriendlyComponent', () => {
  let component: FriendlyComponent;
  let fixture: ComponentFixture<FriendlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
