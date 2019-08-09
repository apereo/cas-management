import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsosessionComponent } from './ssosession.component';

describe('SsosessionComponent', () => {
  let component: SsosessionComponent;
  let fixture: ComponentFixture<SsosessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsosessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsosessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
