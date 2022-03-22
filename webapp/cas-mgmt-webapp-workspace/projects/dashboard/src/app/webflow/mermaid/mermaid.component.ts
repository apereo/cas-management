import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import mermaid from "mermaid";
import svgPanZoom from "svg-pan-zoom";

const config = {
  theme: "neutral",
  startOnLoad: false,
  securityLevel: "loose",
  flowChart: {
    useMaxWidth: true,
    htmlLabels: true,
  },
  themeVariables: {
    fontSize: "12px",
    primaryColor: "#607D8B",
  },
};

/**
 * Component to display version and other details about the deployed CAS instance.
 *
 * @author Ryan Mathis
 */
@Component({
  selector: "mermaid",
  templateUrl: "./mermaid.component.html",
  styleUrls: [],
})
export class MermaidComponent implements OnChanges {
  @Input() schema: string = ``;
  @Input() title: string = ``;

  @ViewChild("mermaid")
  mermaid: ElementRef;

  panZoom: any;

  constructor() {}

  /**
   * Starts the component by extracting data from resolver and loading table.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.schema && changes.schema) {
      mermaid.initialize({
        ...config,
      });
      setTimeout(() => {
        mermaid.init();
        const element = this.mermaid.nativeElement;
        const svg = element.querySelector('svg');
        //svg.setAttribute('height', 'auto');
        this.panZoom = svgPanZoom(svg, {
          panEnabled: true,
          zoomEnabled: true,
          mouseWheelZoomEnabled: false,
          preventMouseEventsDefault: true,
          center: false
        });
      }, 200);
    }
  }

  zoomIn(): void {
    this.panZoom.zoomIn();
  }
}

