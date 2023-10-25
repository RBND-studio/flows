export interface FlowTooltipStep {
  title: string;
  body?: string;
  element: string;
  options?: { text: string; action: number }[];
}
export interface FlowModalStep {
  title: string;
  body?: string;
  options?: { text: string; action: number }[];
}
export interface WaitStepOptions {
  element?: string;
  form?: {
    element: string;
    values: { element: string; value: string }[];
  };
  change?: {
    element: string;
    value: string | RegExp;
  }[];
  action?: number;
}
export interface FlowWaitStep {
  wait: WaitStepOptions | WaitStepOptions[];
}
export type FlowStep = FlowModalStep | FlowTooltipStep | FlowWaitStep;
type Step = FlowStep | FlowStep[][];
export interface Flow {
  id: string;
  element?: string;
  steps: Step[];
}
export type FlowStepIndex = number | number[];
export interface TrackingEvent {
  type: "startFlow" | "nextStep" | "prevStep" | "finishFlow" | "cancelFlow";
  flowId: string;
  step: FlowStepIndex;
  userId?: string;
  customerId?: string;
}

export interface FlowsOptions {
  customerId?: string;
  flows?: Flow[];
  onNextStep?: (step: Step) => void;
  onPrevStep?: (step: Step) => void;
  tracking?: (event: TrackingEvent) => void;
}
export interface Instance {
  element: Element;
  flowId: string;
}
export interface FlowsContext {
  customerId?: string;
  userId?: string;
  flowsById?: Record<string, Flow>;
  onNextStep?: (step: Step) => void;
  onPrevStep?: (step: Step) => void;
  tracking?: (event: TrackingEvent) => void;
}