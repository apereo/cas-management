import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoComponent } from './userinfo.component';

describe('UserinfoComponent', () => {
  let component: UserinfoComponent;
  let fixture: ComponentFixture<UserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
