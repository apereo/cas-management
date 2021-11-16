import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorComponent } from '../editor.component';
import { AbstractRegisteredService } from '@apereo/mgmt-lib/src/lib/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreviewService } from './preview.service';


@Component({
    selector: 'lib-preview-dialog',
    templateUrl: 'preview-dialog.component.html',
})
export class PreviewDialog implements AfterViewInit {

    @ViewChild('editor', { static: false })
    editor: EditorComponent;

    file$: Observable<unknown>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            format: string,
            service: AbstractRegisteredService
        },
        public dialogRef: MatDialogRef<PreviewDialog>,
        private service: PreviewService
    ) {}

    ngAfterViewInit() {
        const { format, service } = this.data;
        this.file$ = this.service.validate(format, service).pipe(
            map(resp => JSON.stringify(resp, null, 4))
        );
    }

    onOkClick(): void {
        this.dialogRef.close();
    }
}