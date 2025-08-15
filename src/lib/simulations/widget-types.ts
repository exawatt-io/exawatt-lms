// Widget system types for embeddable simulations

export type WidgetSize = 'compact' | 'medium' | 'full';
export type WidgetMode = 'guided' | 'interactive' | 'demo' | 'sandbox';

export interface BaseWidgetProps {
  scenario?: string;
  mode?: WidgetMode;
  size?: WidgetSize;
  showComponents?: string[];
  locked?: string[];
  editable?: string[];
  objectives?: string[];
  className?: string;
  onComplete?: (results: any) => void;
  onStepComplete?: (step: string, data: any) => void;
}

export interface WidgetScenario {
  id: string;
  name: string;
  description: string;
  learningObjectives: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  data: any; // Scenario-specific data
  constraints: {
    locked: string[];
    editable: string[];
    showComponents: string[];
    hideComponents?: string[];
  };
  guidance?: {
    steps: Array<{
      id: string;
      title: string;
      description: string;
      highlight?: string[];
      action?: string;
    }>;
    hints: Record<string, string>;
  };
}

export interface WidgetState {
  currentStep?: number;
  completed: boolean;
  results: any;
  userInteractions: number;
  timeSpent: number;
  errors: string[];
}

export interface WidgetComponent {
  id: string;
  title: string;
  required: boolean;
  dependencies?: string[];
  render: (props: any) => React.ReactNode;
}

export interface SimulationWidget {
  type: string;
  scenarios: Record<string, WidgetScenario>;
  components: Record<string, WidgetComponent>;
  defaultProps: Partial<BaseWidgetProps>;
}