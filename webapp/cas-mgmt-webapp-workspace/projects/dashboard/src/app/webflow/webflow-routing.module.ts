import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebflowComponent } from "./webflow.component";
import { WebflowResolve } from "./webflow.resolve";

const routes: Routes = [
  {
    path: "",
    component: WebflowComponent,
    resolve: {
      resp: WebflowResolve,
    },
  },
];

/**
 * Routing module for InfoModule.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebflowRoutingModule {}
