// Type definitions for Deep Tree Echo agent
// Based on the deep-tree-echo-hub7.tsx file and agent roles documentation

/**
 * Simulation State
 * 
 * Represents the current state of the Deep Tree Echo simulation,
 * including the active cognitive state and associated metadata.
 */
export interface SimulationState {
  activeState: string;
  previousState: string;
  stateHistory: string[];
  stateTransitions: number;
  stateMetadata: Record<string, any>;
  timestamp: number;
}

/**
 * Prime-Composite Neural Structure
 * 
 * Represents the fundamental structure used by Deep Tree Echo for
 * cognitive modeling and visualization.
 */
export interface PrimeCompositeStructure {
  primes: number[];
  composites: number[];
  connections: Connection[];
  layers: Layer[];
  activationPattern: number[];
}

/**
 * Neural Connection
 * 
 * Represents a connection between nodes in the neural structure.
 */
export interface Connection {
  sourceId: string;
  targetId: string;
  weight: number;
  type: ConnectionType;
  active: boolean;
}

/**
 * Connection Type
 * 
 * Different types of connections in the neural structure.
 */
export enum ConnectionType {
  EXCITATORY = 'excitatory',
  INHIBITORY = 'inhibitory',
  RECURSIVE = 'recursive',
  LATERAL = 'lateral'
}

/**
 * Neural Layer
 * 
 * Represents a layer in the neural structure.
 */
export interface Layer {
  id: string;
  nodes: Node[];
  depth: number;
  activationFunction: ActivationFunction;
}

/**
 * Neural Node
 * 
 * Represents a node in the neural structure.
 */
export interface Node {
  id: string;
  value: number;
  prime: boolean;
  connections: string[]; // IDs of connected nodes
  activation: number;
}

/**
 * Activation Function
 * 
 * Different types of activation functions for neural processing.
 */
export enum ActivationFunction {
  SIGMOID = 'sigmoid',
  RELU = 'relu',
  TANH = 'tanh',
  SOFTMAX = 'softmax',
  PRIME_RESONANCE = 'primeResonance'
}

/**
 * EchoLang Code
 * 
 * Represents transpiled code from the EchoLang Transpiler.
 */
export interface EchoLangCode {
  source: string;
  compiled: string;
  abstract: any;
  executable: boolean;
  metadata: Record<string, any>;
}

/**
 * Visualization Data
 * 
 * Output from the Prime-Composite Neural Visualizer.
 */
export interface VisualizationData {
  nodes: VisualNode[];
  links: VisualLink[];
  dimensions: Dimensions;
  colorScale: string[];
  metadata: Record<string, any>;
}

/**
 * Visual Node
 * 
 * Represents a node in the visualization.
 */
export interface VisualNode {
  id: string;
  x: number;
  y: number;
  z?: number;
  radius: number;
  color: string;
  label?: string;
  group?: string;
  data?: any;
}

/**
 * Visual Link
 * 
 * Represents a connection in the visualization.
 */
export interface VisualLink {
  source: string;
  target: string;
  value: number;
  color: string;
  width: number;
  type: string;
}

/**
 * Dimensions
 * 
 * Represents the dimensions of the visualization.
 */
export interface Dimensions {
  width: number;
  height: number;
  depth?: number;
}
