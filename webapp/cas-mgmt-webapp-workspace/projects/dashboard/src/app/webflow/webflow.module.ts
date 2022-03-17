import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WebflowRoutingModule } from "./webflow-routing.module";
import { ProjectShareModule } from "../project-share/project-share.module";
import { WebflowComponent } from "./webflow.component";
import { MermaidComponent } from "./mermaid/mermaid.component";

/**
 * Module to lazy-load info functionality.
 *
 * @author Ryan Mathis
 */
@NgModule({
  declarations: [
    WebflowComponent,
    MermaidComponent
  ],
  imports: [
    CommonModule,
    ProjectShareModule,
    WebflowRoutingModule
  ],
})
export class WebflowModule {}
