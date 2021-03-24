import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityIdComponent } from './entityid.component';

describe('RedirectUriComponent', () => {
  let component: EntityIdComponent;
  let fixture: ComponentFixture<EntityIdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
