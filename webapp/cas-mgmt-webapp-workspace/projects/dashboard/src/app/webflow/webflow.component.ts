import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../core/dashboard-service";
import { ControlsService } from "@apereo/mgmt-lib";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Flow, SpringWebflow, WebflowGraph } from "./webflow.model";
import { WebflowService } from "./webflow.service";
import { WebflowDialogComponent } from "./webflow-dialog.component";
import { MatDialog } from "@angular/material/dialog";

/**
 * Component to display version and other details about the deployed CAS instance.
 *
 * @author Ryan Mathis
 */
@Component({
  selector: "app-webflow",
  templateUrl: "./webflow.component.html",
  styleUrls: ['./webflow.component.scss'],
})
export class WebflowComponent implements OnInit {

  flows$: Observable<any>;

  constructor(
    private service: WebflowService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  /**
   * Starts the component by extracting data from resolver and loading table.
   */
  ngOnInit() {
    this.flows$ = this.route.data.pipe(
      map((f) => Object.keys(f.resp).map((id: string) => ({ id, ...f.resp[id] })))
    );
  }

  openFlowChart(id: string, flow: Flow) {
    this.dialog.open(WebflowDialogComponent, {
      maxWidth: '95vw',
      maxHeight: "95vh",
      position: { top: "1rem" },
      data: this.service.parseAsMermaid(id, flow),
    });
  }
}
