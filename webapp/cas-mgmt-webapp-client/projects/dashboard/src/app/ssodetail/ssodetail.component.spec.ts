import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsodetailComponent } from './ssodetail.component';

describe('SsodetailComponent', () => {
  let component: SsodetailComponent;
  let fixture: ComponentFixture<SsodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
