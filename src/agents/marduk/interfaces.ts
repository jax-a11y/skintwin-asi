// Define the core interfaces for the Marduk agent
// Based on the marduk-v15.md file and the agent roles documentation

/**
 * Marduk Agent Interface
 * 
 * Represents the systems architect and integration specialist within the SkinTwin-ASI workbench.
 * Focuses on orchestrating interactions between different subsystems, identifying leverage points,
 * and designing recursive feedback loops.
 */
export interface MardukAgent {
  // Core capabilities
  orchestrateSubsystems: (subsystems: Subsystem[]) => SystemArchitecture;
  recognizePatterns: (data: any) => Pattern[];
  designRecursiveSolution: (problem: Problem) => Solution;
  enhanceMetaCognition: (system: any) => MetaCognitiveEnhancement;
  integrateTechnicalDomains: (domains: Domain[]) => IntegratedSystem;
  
  // State management
  currentArchitecture: SystemArchitecture;
  subsystemStates: Record<SubsystemType, SubsystemState>;
  recursiveFeedbackLoops: FeedbackLoop[];
  leveragePoints: LeveragePoint[];
  
  // Interaction methods
  processUserInput: (input: string) => void;
  generateResponse: () => string;
  explainArchitecture: (architecture: SystemArchitecture) => string;
  identifyLeveragePoints: (system: any) => LeveragePoint[];
}

/**
 * Subsystem Types
 * 
 * The four primary subsystems in Marduk's cognitive framework.
 */
export enum SubsystemType {
  MEMORY = 'memory',
  TASK = 'task',
  AI = 'ai',
  AUTONOMY = 'autonomy'
}

/**
 * Subsystem Interface
 * 
 * Represents one of the four subsystems in Marduk's cognitive framework.
 */
export interface Subsystem {
  type: SubsystemType;
  components: Component[];
  state: SubsystemState;
  connections: Connection[];
  metadata: Record<string, any>;
}

/**
 * Subsystem State
 * 
 * Represents the current state of a subsystem.
 */
export interface SubsystemState {
  active: boolean;
  performance: number; // 0-1 scale
  load: number; // 0-1 scale
  integrity: number; // 0-1 scale
  adaptability: number; // 0-1 scale
}

/**
 * Component Interface
 * 
 * Represents a component within a subsystem.
 */
export interface Component {
  id: string;
  name: string;
  function: string;
  inputs: string[];
  outputs: string[];
  state: ComponentState;
}

/**
 * Component State
 * 
 * Represents the current state of a component.
 */
export interface ComponentState {
  active: boolean;
  performance: number; // 0-1 scale
  errorRate: number; // 0-1 scale
  lastUpdated: number; // timestamp
}

/**
 * Connection Interface
 * 
 * Represents a connection between components or subsystems.
 */
export interface Connection {
  sourceId: string;
  targetId: string;
  type: ConnectionType;
  bandwidth: number;
  latency: number;
  reliability: number; // 0-1 scale
}

/**
 * Connection Type
 * 
 * Different types of connections in the system architecture.
 */
export enum ConnectionType {
  DATA_FLOW = 'dataFlow',
  CONTROL = 'control',
  FEEDBACK = 'feedback',
  RECURSIVE = 'recursive'
}

/**
 * System Architecture
 * 
 * Represents the overall architecture designed by Marduk.
 */
export interface SystemArchitecture {
  subsystems: Subsystem[];
  connections: Connection[];
  feedbackLoops: FeedbackLoop[];
  leveragePoints: LeveragePoint[];
  emergentProperties: EmergentProperty[];
}

/**
 * Feedback Loop
 * 
 * Represents a recursive feedback loop in the system.
 */
export interface FeedbackLoop {
  id: string;
  components: string[]; // IDs of involved components
  type: FeedbackLoopType;
  gain: number;
  delay: number;
  stability: number; // 0-1 scale
}

/**
 * Feedback Loop Type
 * 
 * Different types of feedback loops in the system.
 */
export enum FeedbackLoopType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  COMPLEX = 'complex',
  RECURSIVE = 'recursive'
}

/**
 * Leverage Point
 * 
 * Represents a point in the system where small changes can lead to large effects.
 */
export interface LeveragePoint {
  id: string;
  location: string; // Component or connection ID
  potency: number; // 0-1 scale
  stability: number; // 0-1 scale
  accessibility: number; // 0-1 scale
  description: string;
}

/**
 * Emergent Property
 * 
 * Represents an emergent property of the system.
 */
export interface EmergentProperty {
  id: string;
  name: string;
  description: string;
  components: string[]; // IDs of contributing components
  stability: number; // 0-1 scale
  predictability: number; // 0-1 scale
}

/**
 * Problem Interface
 * 
 * Represents a problem to be solved by Marduk.
 */
export interface Problem {
  id: string;
  description: string;
  domain: Domain;
  constraints: Constraint[];
  objectives: Objective[];
}

/**
 * Solution Interface
 * 
 * Represents a solution designed by Marduk.
 */
export interface Solution {
  id: string;
  problemId: string;
  architecture: SystemArchitecture;
  implementation: Implementation;
  evaluation: Evaluation;
}

/**
 * Domain Interface
 * 
 * Represents a technical domain.
 */
export interface Domain {
  id: string;
  name: string;
  concepts: string[];
  principles: string[];
  technologies: string[];
}

/**
 * Constraint Interface
 * 
 * Represents a constraint on a problem or solution.
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
  REGULATORY = 'regulatory'
}

/**
 * Objective Interface
 * 
 * Represents an objective for a solution.
 */
export interface Objective {
  id: string;
  description: string;
  priority: number; // 0-1 scale
  metrics: Metric[];
}

/**
 * Metric Interface
 * 
 * Represents a metric for evaluating an objective.
 */
export interface Metric {
  id: string;
  name: string;
  description: string;
  unit: string;
  target: number;
  tolerance: number;
}

/**
 * Implementation Interface
 * 
 * Represents the implementation of a solution.
 */
export interface Implementation {
  components: ImplementationComponent[];
  dependencies: Dependency[];
  timeline: Timeline;
  risks: Risk[];
}

/**
 * Implementation Component
 * 
 * Represents a component in the implementation of a solution.
 */
export interface ImplementationComponent {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  dependencies: string[]; // IDs of dependent components
  status: ImplementationStatus;
}

/**
 * Implementation Status
 * 
 * Different statuses for implementation components.
 */
export enum ImplementationStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked'
}

/**
 * Dependency Interface
 * 
 * Represents a dependency in the implementation.
 */
export interface Dependency {
  id: string;
  name: string;
  version: string;
  type: DependencyType;
  criticality: number; // 0-1 scale
}

/**
 * Dependency Type
 * 
 * Different types of dependencies.
 */
export enum DependencyType {
  LIBRARY = 'library',
  FRAMEWORK = 'framework',
  SERVICE = 'service',
  HARDWARE = 'hardware'
}

/**
 * Timeline Interface
 * 
 * Represents the timeline for implementing a solution.
 */
export interface Timeline {
  phases: Phase[];
  totalDuration: number;
  criticalPath: string[]; // IDs of tasks on the critical path
}

/**
 * Phase Interface
 * 
 * Represents a phase in the implementation timeline.
 */
export interface Phase {
  id: string;
  name: string;
  tasks: Task[];
  duration: number;
  dependencies: string[]; // IDs of dependent phases
}

/**
 * Task Interface
 * 
 * Represents a task in the implementation timeline.
 */
export interface Task {
  id: string;
  name: string;
  description: string;
  duration: number;
  dependencies: string[]; // IDs of dependent tasks
  resources: string[];
  status: TaskStatus;
}

/**
 * Task Status
 * 
 * Different statuses for tasks.
 */
export enum TaskStatus {
  NOT_STARTED = 'notStarted',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked'
}

/**
 * Risk Interface
 * 
 * Represents a risk in the implementation.
 */
export interface Risk {
  id: string;
  description: string;
  probability: number; // 0-1 scale
  impact: number; // 0-1 scale
  mitigationStrategy: string;
}

/**
 * Evaluation Interface
 * 
 * Represents the evaluation of a solution.
 */
export interface Evaluation {
  metrics: MetricEvaluation[];
  overallScore: number; // 0-1 scale
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

/**
 * Metric Evaluation
 * 
 * Represents the evaluation of a metric.
 */
export interface MetricEvaluation {
  metricId: string;
  value: number;
  target: number;
  score: number; // 0-1 scale
  notes: string;
}

/**
 * Meta-Cognitive Enhancement
 * 
 * Represents an enhancement to the system's meta-cognitive capabilities.
 */
export interface MetaCognitiveEnhancement {
  id: string;
  description: string;
  targetSubsystem: SubsystemType;
  enhancementType: MetaCognitiveEnhancementType;
  impact: number; // 0-1 scale
}

/**
 * Meta-Cognitive Enhancement Type
 * 
 * Different types of meta-cognitive enhancements.
 */
export enum MetaCognitiveEnhancementType {
  SELF_MONITORING = 'selfMonitoring',
  SELF_REGULATION = 'selfRegulation',
  SELF_MODIFICATION = 'selfModification',
  SELF_REFLECTION = 'selfReflection'
}

/**
 * Integrated System
 * 
 * Represents a system that integrates multiple technical domains.
 */
export interface IntegratedSystem {
  domains: Domain[];
  interfaces: Interface[];
  transformations: Transformation[];
  emergentCapabilities: EmergentCapability[];
}

/**
 * Interface
 * 
 * Represents an interface between domains in an integrated system.
 */
export interface Interface {
  id: string;
  sourceDomain: string;
  targetDomain: string;
  mappings: Mapping[];
  compatibility: number; // 0-1 scale
}

/**
 * Mapping
 * 
 * Represents a mapping between concepts in different domains.
 */
export interface Mapping {
  sourceId: string;
  targetId: string;
  transformationId: string;
  fidelity: number; // 0-1 scale
}

/**
 * Transformation
 * 
 * Represents a transformation between domains.
 */
export interface Transformation {
  id: string;
  name: string;
  description: string;
  sourceDomain: string;
  targetDomain: string;
  reversible: boolean;
  fidelity: number; // 0-1 scale
}

/**
 * Emergent Capability
 * 
 * Represents an emergent capability of an integrated system.
 */
export interface EmergentCapability {
  id: string;
  name: string;
  description: string;
  domains: string[]; // IDs of contributing domains
  novelty: number; // 0-1 scale
  utility: number; // 0-1 scale
}

/**
 * Pattern
 * 
 * Represents a pattern recognized by Marduk.
 */
export interface Pattern {
  id: string;
  name: string;
  description: string;
  elements: string[];
  confidence: number; // 0-1 scale
  significance: number; // 0-1 scale
}

/**
 * Marduk Configuration
 * 
 * Configuration options for initializing a Marduk agent instance.
 */
export interface MardukConfig {
  initialArchitecture: SystemArchitecture;
  subsystemConfigurations: Record<SubsystemType, any>;
  recursionDepth: number;
  leveragePointThreshold: number;
  patternLibrary: Pattern[];
}
