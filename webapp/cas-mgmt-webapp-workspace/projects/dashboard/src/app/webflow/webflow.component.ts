import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../core/dashboard-service";
import { ControlsService } from "@apereo/mgmt-lib";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { SpringWebflow, WebflowGraph } from "./webflow.model";
import { WebflowService } from "./webflow.service";

/**
 * Component to display version and other details about the deployed CAS instance.
 *
 * @author Ryan Mathis
 */
@Component({
  selector: "app-webflow",
  templateUrl: "./webflow.component.html",
  styleUrls: [],
})
export class WebflowComponent implements OnInit {

  flow$: Observable<SpringWebflow>;

  graphs$: Observable<WebflowGraph[]> = of([]);

  constructor(
    private service: WebflowService,
    private route: ActivatedRoute
  ) {
    this.graphs$ = this.route.data.pipe(map(f => this.service.parseAsMermaid(f.resp)));
  }

  /**
   * Starts the component by extracting data from resolver and loading table.
   */
  ngOnInit() {}
}
