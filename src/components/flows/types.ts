/**
 * Types for the Dynamic Flow Visualization Component
 */

// Flow Types
export enum FlowType {
  DATA = 'data',
  CONTROL = 'control',
  FEEDBACK = 'feedback',
  META_COGNITIVE = 'meta-cognitive'
}

// Flow Intensity Levels
export enum IntensityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Flow States
export enum FlowState {
  ACTIVE = 'active',
  IDLE = 'idle',
  BLOCKED = 'blocked',
  OVERLOADED = 'overloaded'
}

// Component Types
export enum ComponentType {
  DEEP_TREE_ECHO = 'deep-tree-echo',
  MARDUK = 'marduk',
  PLINGUA_MEMBRANE = 'plingua-membrane',
  JAX_CEO = 'jax-ceo',
  FRAMEWORK = 'framework',
  APPLICATION = 'application'
}

// Flow Definition
export interface Flow {
  id: string;
  type: FlowType;
  source: string;
  target: string;
  intensity: IntensityLevel;
  state: FlowState;
  latency: number; // 0-1 scale, 0 = instant, 1 = high latency
  reliability: number; // 0-1 scale, 0 = unreliable, 1 = highly reliable
  bandwidth: number; // 0-1 scale, 0 = low bandwidth, 1 = high bandwidth
  label?: string;
}

// Component Node Definition
export interface ComponentNode {
  id: string;
  type: ComponentType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Flow Visualization Props
export interface FlowVisualizationProps {
  nodes: ComponentNode[];
  flows: Flow[];
  width: number;
  height: number;
  selectedFlowTypes?: FlowType[];
  selectedComponentIds?: string[];
  onFlowClick?: (flow: Flow) => void;
  onNodeClick?: (node: ComponentNode) => void;
}
