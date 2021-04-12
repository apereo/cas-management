import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ControlsService, EditorComponent, ImportService} from '@apereo/mgmt-lib/src/lib/ui';
import {Subscription} from 'rxjs';

/**
 * Component used to view a service uploaded from a file.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-import',
  templateUrl: './import.component.html'
})
export class ImportComponent implements OnInit, OnDestroy{

  file: string;
  subscriptions: Subscription[] = [];

  @ViewChild(EditorComponent, { static: true })
  editor: EditorComponent;

  constructor(public service: ImportService,
              public controls: ControlsService,
              public router: Router) {
    this.controls.icon = 'code';
    this.controls.title = 'Import Service';
  }

  /**
   * Inits component.
   */
  ngOnInit(): void {
    this.controls.resetButtons();
    this.controls.showOpen = true;
    this.controls.showEditorOptions = true;
    this.subscriptions.push(this.controls.save.subscribe(() => this.save()));
    this.subscriptions.push(this.controls.openFile.subscribe((evt) => this.getFile(evt)));
    this.subscriptions.push(this.controls.editorOptions.subscribe(() => this.editor.showOptions()));
  }

  /**
   * Destroys subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Saves the imported service to the registry.
   */
  save() {
    this.service.import(this.editor.getFile())
      .subscribe(
        () => this.router.navigate(['importService']),
        () => alert('The system was not able to parse your imported service as a valid Registered Service.')
      );
  }

  /**
   * Handles the result of the file input element to open a file from the users system.
   *
   * @param evt - event
   */
  getFile(evt: Event) {
    const input: HTMLInputElement = evt.currentTarget as HTMLInputElement;
    const reader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = (function(fe: ImportComponent) {
      // tslint:disable-next-line:only-arrow-functions
      return function(e: Event) {
        fe.file = reader.result as string;
      };
    })(this);
    reader.readAsText(input.files[0]);
  }
}
