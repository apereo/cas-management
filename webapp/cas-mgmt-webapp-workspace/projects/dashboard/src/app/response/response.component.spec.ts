import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponseComponent } from './response.component';

describe('ResolveComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
