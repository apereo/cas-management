import {Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from './notes.service';
import {ControlsService, EditorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {Subscription} from 'rxjs';

/**
 * Component to display/update notes made to a pull request.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-notes',
  templateUrl: './notes.component.html'
})

export class NotesComponent implements OnInit, OnDestroy {

  @Output()
  commit: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor')
  editor: EditorComponent;

  @Input()
  viewOnly: boolean;

  file: string;

  subscription: Subscription;

  constructor(public route: ActivatedRoute,
              public service: NotesService,
              public controls: ControlsService) {
    this.controls.icon = 'edit';
    this.controls.title = 'Notes';
  }

  /**
   * Pulls the note id from the route and calls the server.
   */
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.service.getNotes(id)
      .subscribe(resp => this.file = resp);
    this.controls.resetButtons();
    this.controls.showEdit = true;
    this.subscription = this.controls.save.subscribe(() => this.saveNote());
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   *  Gets updated note from editor and emits event.
   */
  saveNote() {
    this.commit.emit(this.editor.getFile());
  }

}
