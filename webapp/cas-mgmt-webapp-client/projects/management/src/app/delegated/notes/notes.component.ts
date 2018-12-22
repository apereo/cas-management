import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EditorComponent } from '../../project-share/editor.component';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from './notes.service';
import {SpinnerService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

  @Output()
  commit: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor')
  editor: EditorComponent;

  @Input()
  viewOnly: boolean;

  file: string;

  constructor(public route: ActivatedRoute,
              public service: NotesService,
              public spinner: SpinnerService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.spinner.start('Loading notes');
    this.service.getNotes(id)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.file = resp);
  }

  saveNote() {
    this.commit.emit(this.editor.getFile());
  }

}
