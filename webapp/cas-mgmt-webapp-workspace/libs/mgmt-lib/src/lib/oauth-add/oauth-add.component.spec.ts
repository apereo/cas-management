import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {OauthAddComponent} from './add.component';

describe('AddComponent', () => {
  let component: OauthAddComponent;
  let fixture: ComponentFixture<OauthAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
