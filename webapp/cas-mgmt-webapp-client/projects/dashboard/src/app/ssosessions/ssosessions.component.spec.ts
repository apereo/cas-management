import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsosessionsComponent } from './ssosessions.component';

describe('SsosessionsComponent', () => {
  let component: SsosessionsComponent;
  let fixture: ComponentFixture<SsosessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsosessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsosessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
