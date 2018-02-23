import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsfedOptionsComponent } from './wsfed-options.component';

describe('WsfedOptionsComponent', () => {
  let component: WsfedOptionsComponent;
  let fixture: ComponentFixture<WsfedOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsfedOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsfedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
