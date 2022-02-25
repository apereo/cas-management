import {Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotesService} from './notes.service';
import {ControlsService, EditorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable, Subject} from 'rxjs';
import { map, share, skip, switchMap, takeUntil } from 'rxjs/operators';

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

  file$: Observable<string>;

  private subj = new Subject<string>();
  val$ = this.subj.asObservable();

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public route: ActivatedRoute,
              public service: NotesService,
              public controls: ControlsService,
              public router: Router) {
    this.controls.icon = 'edit';
    this.controls.title = 'Notes';
  }

  /**
   * Pulls the note id from the route and calls the server.
   */
  ngOnInit() {
    this.file$ = this.getNote();
    this.file$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(v => this.subj.next(v));
    this.controls.resetButtons();
    this.controls.showEdit = true;

    this.controls.save.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.saveNote());
    this.controls.reset.pipe(switchMap(() => this.getNote()), takeUntil(this.ngUnsubscribe)).subscribe(v => this.subj.next(v));
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getNote(): Observable<string> {
    console.log('notes', this.route.snapshot.params.id);
    return this.service.getNotes(this.route.snapshot.params.id).pipe(share());
  }

  onEditorChange(val: string) {
    this.subj.next(val);
  }

  /**
   *  Gets updated note from editor and emits event.
   */
  saveNote() {
    const id = this.route.snapshot.params.id;
    const saved = this.service.addNote(id, this.editor.getFile()).subscribe((txt) => {
      this.router.navigate(['./delegated/pulls']);
      saved.unsubscribe();
    });
  }

  /**
   *  Gets updated note from editor and emits event.
   */
  resetNote() {
    const id = this.route.snapshot.params.id;
    this.file$ = this.service.getNotes(id);
  }

}
