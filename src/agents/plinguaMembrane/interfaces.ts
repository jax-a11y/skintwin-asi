// Define the core interfaces for the PLingua Membrane agent
// Based on the PLingua Dash.md file and the agent roles documentation

/**
 * PLingua Membrane Agent Interface
 * 
 * Represents the biological modeler and simulation specialist within the SkinTwin-ASI workbench.
 * Focuses on creating and analyzing formal models of skin biology, simulating the effects of
 * different interventions, and translating between biological processes and computational representations.
 */
export interface PLinguaMembraneAgent {
  // Core capabilities
  createPSystemModel: (modelType: PSystemType, parameters: any) => PSystemModel;
  simulatePSystem: (model: PSystemModel, steps: number) => SimulationResult;
  createModule: (name: string, definition: any) => Module;
  translateFormat: (model: PSystemModel, format: FormatType) => string;
  
  // State management
  activeModel: PSystemModel | null;
  simulationResults: SimulationResult | null;
  moduleLibrary: Module[];
  
  // Interaction methods
  processUserInput: (input: string) => void;
  generateResponse: () => string;
  explainModel: (model: PSystemModel) => string;
  suggestOptimizations: (model: PSystemModel) => Optimization[];
}

/**
 * P-System Types
 * 
 * Different types of P-systems supported by PLingua.
 */
export enum PSystemType {
  TRANSITION = 'transition',
  MEMBRANE_DIVISION = 'membraneDivision',
  PROBABILISTIC = 'probabilistic',
  TISSUE = 'tissue',
  SPIKING_NEURAL = 'spikingNeural'
}

/**
 * P-System Model
 * 
 * Represents a P-system model of skin biology.
 */
export interface PSystemModel {
  id: string;
  name: string;
  type: PSystemType;
  membranes: Membrane[];
  rules: Rule[];
  initialConfiguration: Configuration;
  parameters: Record<string, any>;
  metadata: Record<string, any>;
}

/**
 * Membrane
 * 
 * Represents a membrane in a P-system model.
 */
export interface Membrane {
  id: string;
  label: string;
  parent: string | null; // ID of parent membrane, null for skin (outermost)
  children: string[]; // IDs of child membranes
  multiset: Multiset;
  charge: Charge;
}

/**
 * Charge
 * 
 * Represents the electrical charge of a membrane.
 */
export enum Charge {
  POSITIVE = '+',
  NEGATIVE = '-',
  NEUTRAL = '0'
}

/**
 * Multiset
 * 
 * Represents a multiset of objects in a membrane.
 */
export interface Multiset {
  [object: string]: number;
}

/**
 * Rule
 * 
 * Represents a rule in a P-system model.
 */
export interface Rule {
  id: string;
  leftHandSide: RuleSide;
  rightHandSide: RuleSide;
  priority: number;
  probability: number;
  guard: string | null;
  membrane: string; // ID of the membrane where the rule is applied
}

/**
 * Rule Side
 * 
 * Represents one side of a rule.
 */
export interface RuleSide {
  multiset: Multiset;
  membraneChanges: MembraneChange[];
}

/**
 * Membrane Change
 * 
 * Represents a change to a membrane in a rule.
 */
export interface MembraneChange {
  membrane: string; // ID of the membrane
  operation: MembraneOperation;
  charge?: Charge;
}

/**
 * Membrane Operation
 * 
 * Different operations that can be performed on membranes.
 */
export enum MembraneOperation {
  DISSOLVE = 'dissolve',
  DIVIDE = 'divide',
  CREATE = 'create',
  CHANGE_CHARGE = 'changeCharge'
}

/**
 * Configuration
 * 
 * Represents a configuration of a P-system.
 */
export interface Configuration {
  membranes: Record<string, ConfigurationMembrane>;
  step: number;
}

/**
 * Configuration Membrane
 * 
 * Represents a membrane in a configuration.
 */
export interface ConfigurationMembrane {
  multiset: Multiset;
  charge: Charge;
}

/**
 * Simulation Result
 * 
 * Represents the result of a P-system simulation.
 */
export interface SimulationResult {
  initialConfiguration: Configuration;
  steps: Configuration[];
  finalConfiguration: Configuration;
  halted: boolean;
  executedRules: ExecutedRule[];
  statistics: SimulationStatistics;
}

/**
 * Executed Rule
 * 
 * Represents a rule that was executed during a simulation.
 */
export interface ExecutedRule {
  ruleId: string;
  step: number;
  membrane: string;
  objects: Multiset;
}

/**
 * Simulation Statistics
 * 
 * Statistics about a P-system simulation.
 */
export interface SimulationStatistics {
  steps: number;
  objectsCreated: number;
  objectsDestroyed: number;
  membranesCreated: number;
  membranesDestroyed: number;
  rulesExecuted: number;
}

/**
 * Module
 * 
 * Represents a reusable module in PLingua.
 */
export interface Module {
  id: string;
  name: string;
  description: string;
  parameters: Parameter[];
  membranes: Membrane[];
  rules: Rule[];
  dependencies: string[]; // IDs of other modules
}

/**
 * Parameter
 * 
 * Represents a parameter in a module.
 */
export interface Parameter {
  name: string;
  type: ParameterType;
  defaultValue: any;
  description: string;
}

/**
 * Parameter Type
 * 
 * Different types of parameters.
 */
export enum ParameterType {
  INTEGER = 'integer',
  FLOAT = 'float',
  STRING = 'string',
  BOOLEAN = 'boolean',
  MULTISET = 'multiset',
  MEMBRANE = 'membrane'
}

/**
 * Format Type
 * 
 * Different formats for representing P-systems.
 */
export enum FormatType {
  PLINGUA = 'plingua',
  JSON = 'json',
  XML = 'xml',
  BINARY = 'binary'
}

/**
 * Optimization
 * 
 * Represents an optimization suggestion for a P-system model.
 */
export interface Optimization {
  id: string;
  description: string;
  target: OptimizationTarget;
  impact: OptimizationImpact;
  implementation: string;
}

/**
 * Optimization Target
 * 
 * Different targets for optimization.
 */
export enum OptimizationTarget {
  PERFORMANCE = 'performance',
  MEMORY = 'memory',
  ACCURACY = 'accuracy',
  READABILITY = 'readability'
}

/**
 * Optimization Impact
 * 
 * Different levels of impact for optimizations.
 */
export enum OptimizationImpact {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

/**
 * PLingua Membrane Configuration
 * 
 * Configuration options for initializing a PLingua Membrane agent instance.
 */
export interface PLinguaMembraneConfig {
  initialModel: PSystemModel | null;
  moduleLibrary: Module[];
  simulationOptions: {
    maxSteps: number;
    timeout: number;
    collectStatistics: boolean;
  };
}
