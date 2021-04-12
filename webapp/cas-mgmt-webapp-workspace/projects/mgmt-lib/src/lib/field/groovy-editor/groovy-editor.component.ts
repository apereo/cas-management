import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditorComponent } from '@apereo/mgmt-lib/src/lib/ui';

@Component({
    selector: 'lib-groovy-editor',
    templateUrl: './groovy-editor.component.html'
})
export class GroovyEditorComponent implements AfterViewInit {

    @ViewChild('editor', { static: false }) editor: EditorComponent;

    constructor(public dialogRef: MatDialogRef<GroovyEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngAfterViewInit() {
        this.editor.file = this.data;
    }

    accept() {
        this.dialogRef.close(this.editor.getFile());
    }
}
