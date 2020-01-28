import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from './notes.service';
import {EditorComponent} from 'shared-lib';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})

export class NotesComponent implements OnInit {

  @Output()
  commit: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor', { static: false })
  editor: EditorComponent;

  @Input()
  viewOnly: boolean;

  file: string;

  constructor(public route: ActivatedRoute,
              public service: NotesService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.service.getNotes(id)
      .subscribe(resp => this.file = resp);
  }

  saveNote() {
    this.commit.emit(this.editor.getFile());
  }

}
