import { Injectable } from "@angular/core";
import { SpringWebflow, Flow, WebflowGraph, FlowStates } from "./webflow.model";
import uniqBy from 'lodash/uniqBy';
import find from "lodash/find";

export interface MermaidLine {
    start: string;
    trigger: string;
    next: string;
}

@Injectable({
    providedIn: "root",
})
export class WebflowService {
    createMermaidGraph(key: string, flow: Flow): string {
        return `flowchart TB\n${this.getGraphLines(this.parseFlow(flow))}`;
    }

    parseAsMermaid(flow: SpringWebflow): WebflowGraph[] {
        return Object.keys(flow).map((key) => ({
            title: key,
            schema: this.createMermaidGraph(key, flow[key]),
        }));
    }

    private dedupe(lines: MermaidLine[]): MermaidLine[] {
        return uniqBy(lines, JSON.stringify);
    }

    private getGraphLines(lines: MermaidLine[]): string {
        return lines.reduce((final: string, line: MermaidLine) =>
            (`${final}${line.start}[${line.start}] -->|${line.trigger}| ${line.next};`)
        , '');
    }

    private parseTransitions(start: string, states: FlowStates, parsed: MermaidLine[] = []): MermaidLine[] {
        const transitions = states[start].transitions;
        
        if (transitions) {
            transitions.forEach((transition: string) => {
                const spl = transition.split("->");
                const trigger = spl[0].trim();
                const next = spl[1].trim();
                const line: MermaidLine = { start, trigger, next };
                const dupe = find(parsed, (p) => JSON.stringify(p) === JSON.stringify(line));
                
                if (!dupe) {
                    parsed.push(line);
                    this.parseTransitions(next, states, parsed);
                }
                
            });
        }

        return parsed;
    }

    private parseState(name: string, states: FlowStates): MermaidLine[] {
        return this.parseTransitions(name, states);
    }

    private parseFlow(flow: Flow): MermaidLine[] {
        return this.parseState(flow.startState, flow.states);
    }
}

const ex = `
graph LR
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    B --> G[/Another/]
    C ==>|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
`;