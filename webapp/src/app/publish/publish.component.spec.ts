import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PublishComponent } from './publish.component';
import {Messages} from '../messages';
import {Change} from '../../domain/change';
import {ControlsService} from '../controls/controls.service';

const controlsServiceStub = {
  commit(msg: String): Promise<String> {
    return Promise.resolve('');
  },

  publish(): Promise<void> {
    return Promise.resolve();
  },

  submit(): Promise<void> {
    return Promise.resolve();
  },

  untracked(): Promise<Change[]> {
    return Promise.resolve([]);
  },

  unpublished(): Promise<number> {
    return Promise.resolve(0);
  }
};

describe('PublishComponent', () => {
  let component: PublishComponent;
  let fixture: ComponentFixture<PublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PublishComponent ],
      providers: [
        Messages,
        {provide: ControlsService, useValue: controlsServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
