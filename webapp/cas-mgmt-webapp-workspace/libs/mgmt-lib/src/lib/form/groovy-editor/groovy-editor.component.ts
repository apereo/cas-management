import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditorComponent } from 'shared-lib';

@Component({
    selector: 'app-delete',
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
