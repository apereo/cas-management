
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibNavigationComponent } from './navigation.component';

describe('LibNavigationComponent', () => {
  let component: LibNavigationComponent;
  let fixture: ComponentFixture<LibNavigationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LibNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
