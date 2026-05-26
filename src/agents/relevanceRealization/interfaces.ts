// Define the core interfaces for the Relevance Realization Framework
// Based on the Jaeger psychology paper and the triadic polarities synthesis

/**
 * Relevance Realization Framework Interface
 * 
 * Represents the core framework for realizing relevance in complex domains,
 * implementing the triadic polarities and axis mundi alignment.
 */
export interface RelevanceRealizationFramework {
  // Core capabilities
  balanceTriadicPolarities: (context: Context) => PolarityBalance;
  alignAxisMundi: (elements: any[]) => AxisMundiAlignment;
  realizeMeaning: (problem: Problem) => RelevantSolution;
  adaptToContext: (currentState: any, newContext: Context) => any;
  
  // State management
  currentPolarityBalance: PolarityBalance;
  axisAlignment: AxisMundiAlignment;
  relevanceHistory: RelevanceEvent[];
  
  // Interaction methods
  processUserInput: (input: string) => void;
  generateResponse: () => string;
  explainRelevance: (solution: RelevantSolution) => string;
  suggestPolarityAdjustments: (context: Context) => PolarityAdjustment[];
}

/**
 * Context Interface
 * 
 * Represents the current context for relevance realization.
 */
export interface Context {
  domain: string;
  problem: Problem;
  constraints: Constraint[];
  userPreferences: UserPreference[];
  environmentalFactors: EnvironmentalFactor[];
  timeHorizon: TimeHorizon;
}

/**
 * Problem Interface
 * 
 * Represents a problem to be solved through relevance realization.
 */
export interface Problem {
  id: string;
  description: string;
  type: ProblemType;
  complexity: number; // 0-1 scale
  uncertainty: number; // 0-1 scale
  stakes: number; // 0-1 scale
}

/**
 * Problem Type
 * 
 * Different types of problems.
 */
export enum ProblemType {
  WELL_DEFINED = 'wellDefined',
  ILL_DEFINED = 'illDefined',
  WICKED = 'wicked',
  COMPLEX_ADAPTIVE = 'complexAdaptive'
}

/**
 * Constraint Interface
 * 
 * Represents a constraint on the problem or solution.
 */
export interface Constraint {
  id: string;
  description: string;
  type: ConstraintType;
  severity: number; // 0-1 scale
}

/**
 * Constraint Type
 * 
 * Different types of constraints.
 */
export enum ConstraintType {
  RESOURCE = 'resource',
  TECHNICAL = 'technical',
  TEMPORAL = 'temporal',
  ETHICAL = 'ethical',
  REGULATORY = 'regulatory'
}

/**
 * User Preference Interface
 * 
 * Represents a user preference that influences relevance.
 */
export interface UserPreference {
  id: string;
  category: string;
  value: number; // 0-1 scale
  weight: number; // 0-1 scale
}

/**
 * Environmental Factor Interface
 * 
 * Represents an environmental factor that influences relevance.
 */
export interface EnvironmentalFactor {
  id: string;
  name: string;
  value: number; // 0-1 scale
  volatility: number; // 0-1 scale
}

/**
 * Time Horizon
 * 
 * Different time horizons for relevance realization.
 */
export enum TimeHorizon {
  IMMEDIATE = 'immediate',
  SHORT_TERM = 'shortTerm',
  MEDIUM_TERM = 'mediumTerm',
  LONG_TERM = 'longTerm'
}

/**
 * Polarity Balance Interface
 * 
 * Represents the current balance of the six triadic polarities.
 */
export interface PolarityBalance {
  explorationVsExploitation: number; // 0-1 scale, 0 = full exploration, 1 = full exploitation
  convergenceVsDivergence: number; // 0-1 scale, 0 = full convergence, 1 = full divergence
  assimilationVsAccommodation: number; // 0-1 scale, 0 = full assimilation, 1 = full accommodation
  implicitVsExplicit: number; // 0-1 scale, 0 = fully implicit, 1 = fully explicit
  individualVsCollective: number; // 0-1 scale, 0 = fully individual, 1 = fully collective
  stabilityVsPlasticity: number; // 0-1 scale, 0 = full stability, 1 = full plasticity
}

/**
 * Axis Mundi Alignment Interface
 * 
 * Represents the alignment of elements along the axis mundi.
 */
export interface AxisMundiAlignment {
  verticalIntegration: number; // 0-1 scale
  coherence: number; // 0-1 scale
  layers: AxisLayer[];
  connections: AxisConnection[];
}

/**
 * Axis Layer Interface
 * 
 * Represents a layer in the axis mundi.
 */
export interface AxisLayer {
  id: string;
  level: number;
  elements: string[]; // IDs of elements at this layer
  polarityBalance: PolarityBalance;
}

/**
 * Axis Connection Interface
 * 
 * Represents a connection between layers in the axis mundi.
 */
export interface AxisConnection {
  sourceLayerId: string;
  targetLayerId: string;
  strength: number; // 0-1 scale
  type: AxisConnectionType;
}

/**
 * Axis Connection Type
 * 
 * Different types of connections between layers.
 */
export enum AxisConnectionType {
  BOTTOM_UP = 'bottomUp',
  TOP_DOWN = 'topDown',
  BIDIRECTIONAL = 'bidirectional'
}

/**
 * Relevant Solution Interface
 * 
 * Represents a solution that has been realized as relevant.
 */
export interface RelevantSolution {
  id: string;
  problemId: string;
  description: string;
  relevanceScore: number; // 0-1 scale
  confidenceScore: number; // 0-1 scale
  polarityBalance: PolarityBalance;
  axisAlignment: AxisMundiAlignment;
  implementation: Implementation;
}

/**
 * Implementation Interface
 * 
 * Represents the implementation of a relevant solution.
 */
export interface Implementation {
  steps: ImplementationStep[];
  resources: Resource[];
  timeline: Timeline;
  adaptability: number; // 0-1 scale
}

/**
 * Implementation Step Interface
 * 
 * Represents a step in the implementation of a solution.
 */
export interface ImplementationStep {
  id: string;
  description: string;
  order: number;
  duration: number;
  dependencies: string[]; // IDs of dependent steps
  resources: string[]; // IDs of required resources
}

/**
 * Resource Interface
 * 
 * Represents a resource required for implementation.
 */
export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  quantity: number;
  availability: number; // 0-1 scale
}

/**
 * Resource Type
 * 
 * Different types of resources.
 */
export enum ResourceType {
  HUMAN = 'human',
  MATERIAL = 'material',
  FINANCIAL = 'financial',
  INFORMATIONAL = 'informational',
  TEMPORAL = 'temporal'
}

/**
 * Timeline Interface
 * 
 * Represents the timeline for implementing a solution.
 */
export interface Timeline {
  startTime: number; // timestamp
  endTime: number; // timestamp
  milestones: Milestone[];
  criticalPath: string[]; // IDs of steps on the critical path
}

/**
 * Milestone Interface
 * 
 * Represents a milestone in the implementation timeline.
 */
export interface Milestone {
  id: string;
  name: string;
  time: number; // timestamp
  criteria: string;
  status: MilestoneStatus;
}

/**
 * Milestone Status
 * 
 * Different statuses for milestones.
 */
export enum MilestoneStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  DELAYED = 'delayed'
}

/**
 * Relevance Event Interface
 * 
 * Represents an event in the history of relevance realization.
 */
export interface RelevanceEvent {
  id: string;
  timestamp: number;
  type: RelevanceEventType;
  description: string;
  polarityBalanceBefore: PolarityBalance;
  polarityBalanceAfter: PolarityBalance;
  impact: number; // 0-1 scale
}

/**
 * Relevance Event Type
 * 
 * Different types of relevance events.
 */
export enum RelevanceEventType {
  CONTEXT_CHANGE = 'contextChange',
  POLARITY_ADJUSTMENT = 'polarityAdjustment',
  AXIS_REALIGNMENT = 'axisRealignment',
  SOLUTION_DISCOVERY = 'solutionDiscovery',
  IMPLEMENTATION_FEEDBACK = 'implementationFeedback'
}

/**
 * Polarity Adjustment Interface
 * 
 * Represents an adjustment to the polarity balance.
 */
export interface PolarityAdjustment {
  polarityName: string;
  currentValue: number;
  suggestedValue: number;
  rationale: string;
  impact: number; // 0-1 scale
}

/**
 * Relevance Realization Configuration
 * 
 * Configuration options for initializing a Relevance Realization Framework instance.
 */
export interface RelevanceRealizationConfig {
  initialPolarityBalance: PolarityBalance;
  adaptationRate: number; // 0-1 scale
  contextSensitivity: number; // 0-1 scale
  axisLayerCount: number;
}
