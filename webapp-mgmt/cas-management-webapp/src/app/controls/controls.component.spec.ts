import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ControlsComponent } from './controls.component';
import {CommitComponent} from '../commit/commit.component';
import {Change} from '../../domain/change';
import {ControlsService} from './controls.service';
import {UserService} from '../user.service';
import {PublishComponent} from '../publish/publish.component';
import {Messages} from '../messages';

const userServiceStub = {
  getRoles(): Promise<String[]> {
    return Promise.resolve([]);
  },
  getPermissions(): Promise<String[]> {
    return Promise.resolve([]);
  }
};

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
}

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ ControlsComponent, CommitComponent, PublishComponent ],
      providers: [
        Messages,
        {provide: ControlsService, useValue: controlsServiceStub},
        {provide: UserService, useValue: userServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
