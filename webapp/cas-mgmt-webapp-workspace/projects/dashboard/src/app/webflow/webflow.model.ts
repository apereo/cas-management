export interface FlowAttribute {
    empty?: boolean;
}

export interface FlowStates {
  [key: string]: FlowState;
}

export interface FlowState {
  actionList?: string[];
  entryActions?: string[];
  exitActions?: string[];
  renderActions?: string[];
  transitions?: string[];
  isRedirect?: boolean;
  isViewState?: boolean;
  isEndState?: boolean;
  viewId?: string;
  attributes?: FlowAttribute[];
}

export interface Flow {
  startState: string;
  states: FlowStates;
  possibleOutcomes: string[];
  stateCount: number;
  exceptionHandlers?: string[];
  variables?: string;
}

export interface SpringWebflow {
    [key:string]: Flow;
}

export interface WebflowGraph {
  title: string;
  schema: string;
}