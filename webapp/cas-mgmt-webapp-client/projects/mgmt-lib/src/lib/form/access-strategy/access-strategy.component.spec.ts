import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessStrategyComponent } from './access-strategy.component';

describe('AccessStrategyComponent', () => {
  let component: AccessStrategyComponent;
  let fixture: ComponentFixture<AccessStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
