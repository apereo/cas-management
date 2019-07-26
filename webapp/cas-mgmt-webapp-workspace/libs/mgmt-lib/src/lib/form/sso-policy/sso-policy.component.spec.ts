import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPolicyComponent } from './sso-policy.component';

describe('SsoPolicyComponent', () => {
  let component: SsoPolicyComponent;
  let fixture: ComponentFixture<SsoPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
