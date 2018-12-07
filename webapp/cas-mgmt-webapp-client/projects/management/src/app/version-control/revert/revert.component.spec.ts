import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertComponent } from './revert.component';

describe('RevertComponent', () => {
  let component: RevertComponent;
  let fixture: ComponentFixture<RevertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
