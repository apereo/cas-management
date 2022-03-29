import { AfterViewInit, Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorComponent } from '../editor.component';
import { AbstractRegisteredService } from '@apereo/mgmt-lib/src/lib/model';
import { combineLatest, Observable } from 'rxjs';
import { PreviewService } from './preview.service';
import AceDiff from "ace-diff";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

declare global {
  interface Window {
    ace: any;
  }
}

@Component({
  selector: "lib-preview-dialog",
  templateUrl: "./preview-dialog.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./preview-dialog.component.css"],
})
export class PreviewDialog implements AfterViewInit {
  @ViewChild("editor", { static: false })
  editor: EditorComponent;

  updated: unknown;
  current: unknown;

  diff: boolean = false;

  differ: AceDiff;

  diffConfig: any;

  diffTheme: string = "eclipse";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      format: string;
      service: {
        current: AbstractRegisteredService;
        updated: AbstractRegisteredService;
      };
    },
    public dialogRef: MatDialogRef<PreviewDialog>,
    private service: PreviewService
  ) {}

  ngAfterViewInit() {
    const { format, service } = this.data;
    const { current, updated } = service;

    combineLatest([
      this.service.validate(format, current),
      this.service.validate(format, updated),
    ]).subscribe(([current, updated]) => {
      this.updated = updated;

      this.diffConfig = {
        element: ".acediff",
        theme: `ace/theme/eclipse`,
        mode: `ace/mode/hjson`,
        left: {
          editable: false,
          content: current,
          copyLinkEnabled: false,
        },
        right: {
          editable: false,
          content: updated,
          copyLinkEnabled: false,
        },
      };
    });
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onDiffChange(event: MatSlideToggleChange): void {
    this.diff = event.checked;
    if (this.diff) {
      setTimeout(() => {
        this.differ = new AceDiff(this.diffConfig);
      }, 1);
    } else {
      this.differ.destroy();
    }
  }
}