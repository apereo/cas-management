import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorComponent } from '../editor.component';
import { RegisteredService } from '@apereo/mgmt-lib/src/lib/model';


@Component({
    selector: 'lib-preview-dialog',
    templateUrl: 'preview-dialog.component.html',
})
export class PreviewDialog implements AfterViewInit {

    @ViewChild('editor', { static: false })
    editor: EditorComponent;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<PreviewDialog>
    ) {}

    ngAfterViewInit() {
        this.editor.file = this.data.toString();
    }

    onOkClick(): void {
        this.dialogRef.close();
    }
}