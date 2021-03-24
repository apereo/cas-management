import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component used to set user preferences for the ACE editor.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-editor-options',
  templateUrl: './editor-options.component.html'
})
export class EditorOptionsComponent {

  constructor(public dialogRef: MatDialogRef<EditorOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

}
