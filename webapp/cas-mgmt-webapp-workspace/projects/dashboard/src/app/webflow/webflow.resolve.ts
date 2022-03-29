import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { DashboardService } from "../core/dashboard-service";
import { SpringWebflow } from "./webflow.model";

/**
 * Resolver to retrieve CAS info before navigating to WebflowComponent.
 *
 * @author Ryan Mathis
 */
@Injectable({
  providedIn: "root",
})
export class WebflowResolve implements Resolve<SpringWebflow> {
  constructor(private service: DashboardService) {}

  /**
   * Returns server info.
   *
   * @param route - route snapshot
   * @param state - router state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SpringWebflow> {
    return this.service.getFlow();
  }
}
