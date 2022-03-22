import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WebflowRoutingModule } from "./webflow-routing.module";
import { ProjectShareModule } from "../project-share/project-share.module";
import { WebflowComponent } from "./webflow.component";
import { MermaidComponent } from "./mermaid/mermaid.component";
import { WebflowDialogComponent } from "./webflow-dialog.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";

/**
 * Module to lazy-load info functionality.
 *
 * @author Ryan Mathis
 */
@NgModule({
  declarations: [
    WebflowComponent,
    MermaidComponent,
    WebflowDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    WebflowRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule
  ],
})
export class WebflowModule {}
