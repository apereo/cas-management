import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WebflowGraph } from "./webflow.model";

@Component({
  selector: "webflow-dialog",
  templateUrl: "./webflow-dialog.component.html",
  styleUrls: [],
})
export class WebflowDialogComponent {
  graph: WebflowGraph;

  constructor(
    public dialogRef: MatDialogRef<WebflowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}