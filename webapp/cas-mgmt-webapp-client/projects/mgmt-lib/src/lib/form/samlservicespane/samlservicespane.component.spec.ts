import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamlservicespaneComponent } from './samlservicespane.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';

describe('SamlservicespaneComponent', () => {
  let component: SamlservicespaneComponent;
  let fixture: ComponentFixture<SamlservicespaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule ],
      declarations: [ SamlservicespaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlservicespaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
