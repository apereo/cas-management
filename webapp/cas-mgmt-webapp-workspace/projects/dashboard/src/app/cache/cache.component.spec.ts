import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheComponent } from './sessions.component';

describe('SessionsComponent', () => {
  let component: CacheComponent;
  let fixture: ComponentFixture<CacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
