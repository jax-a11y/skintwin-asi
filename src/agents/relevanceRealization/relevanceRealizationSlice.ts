import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RelevanceRealizationFramework,
  PolarityBalance,
  AxisMundiAlignment,
  RelevanceEvent,
  Context,
  RelevantSolution,
  PolarityAdjustment,
  Problem,
  AxisLayer,
  AxisConnection,
  AxisConnectionType,
  RelevanceEventType
} from './interfaces';

// Define the initial state for the Relevance Realization Framework
interface RelevanceRealizationState {
  isInitialized: boolean;
  isActive: boolean;
  currentPolarityBalance: PolarityBalance;
  axisAlignment: AxisMundiAlignment;
  relevanceHistory: RelevanceEvent[];
  currentContext: Context | null;
  currentSolution: RelevantSolution | null;
  suggestedAdjustments: PolarityAdjustment[];
  userInput: string;
  response: string;
  error: string | null;
}

// Initial polarity balance with all values at midpoint (0.5)
const initialPolarityBalance: PolarityBalance = {
  explorationVsExploitation: 0.5,
  convergenceVsDivergence: 0.5,
  assimilationVsAccommodation: 0.5,
  implicitVsExplicit: 0.5,
  individualVsCollective: 0.5,
  stabilityVsPlasticity: 0.5
};

// Initial axis mundi alignment
const initialAxisAlignment: AxisMundiAlignment = {
  verticalIntegration: 0.5,
  coherence: 0.5,
  layers: [],
  connections: []
};

const initialState: RelevanceRealizationState = {
  isInitialized: false,
  isActive: false,
  currentPolarityBalance: initialPolarityBalance,
  axisAlignment: initialAxisAlignment,
  relevanceHistory: [],
  currentContext: null,
  currentSolution: null,
  suggestedAdjustments: [],
  userInput: '',
  response: '',
  error: null
};

// Create the Relevance Realization slice
const relevanceRealizationSlice = createSlice({
  name: 'relevanceRealization',
  initialState,
  reducers: {
    // Initialize the framework
    initialize: (state, action: PayloadAction<{ 
      initialPolarityBalance?: PolarityBalance,
      axisLayerCount?: number
    }>) => {
      const { initialPolarityBalance, axisLayerCount = 5 } = action.payload;
      
      state.isInitialized = true;
      
      if (initialPolarityBalance) {
        state.currentPolarityBalance = initialPolarityBalance;
      }
      
      // Initialize axis layers
      const layers: AxisLayer[] = [];
      for (let i = 0; i < axisLayerCount; i++) {
        layers.push({
          id: `layer-${i}`,
          level: i,
          elements: [],
          polarityBalance: { ...state.currentPolarityBalance }
        });
      }
      
      // Initialize connections between adjacent layers
      const connections: AxisConnection[] = [];
      for (let i = 0; i < axisLayerCount - 1; i++) {
        connections.push({
          sourceLayerId: `layer-${i}`,
          targetLayerId: `layer-${i + 1}`,
          strength: 0.5,
          type: AxisConnectionType.BIDIRECTIONAL
        });
      }
      
      state.axisAlignment = {
        ...state.axisAlignment,
        layers,
        connections
      };
      
      state.error = null;
    },
    
    // Set the active state of the framework
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    
    // Update the polarity balance
    updatePolarityBalance: (state, action: PayloadAction<Partial<PolarityBalance>>) => {
      state.currentPolarityBalance = {
        ...state.currentPolarityBalance,
        ...action.payload
      };
      
      // Record this as a relevance event
      const event: RelevanceEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: RelevanceEventType.POLARITY_ADJUSTMENT,
        description: 'Polarity balance adjusted',
        polarityBalanceBefore: state.currentPolarityBalance,
        polarityBalanceAfter: {
          ...state.currentPolarityBalance,
          ...action.payload
        },
        impact: 0.5 // Default impact, could be calculated based on magnitude of change
      };
      
      state.relevanceHistory = [event, ...state.relevanceHistory];
    },
    
    // Update the axis alignment
    updateAxisAlignment: (state, action: PayloadAction<Partial<AxisMundiAlignment>>) => {
      state.axisAlignment = {
        ...state.axisAlignment,
        ...action.payload
      };
      
      // Record this as a relevance event
      const event: RelevanceEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: RelevanceEventType.AXIS_REALIGNMENT,
        description: 'Axis mundi realigned',
        polarityBalanceBefore: state.currentPolarityBalance,
        polarityBalanceAfter: state.currentPolarityBalance, // No change in polarity balance
        impact: 0.5 // Default impact
      };
      
      state.relevanceHistory = [event, ...state.relevanceHistory];
    },
    
    // Add an element to an axis layer
    addElementToLayer: (state, action: PayloadAction<{ layerId: string, elementId: string }>) => {
      const { layerId, elementId } = action.payload;
      
      const layerIndex = state.axisAlignment.layers.findIndex(layer => layer.id === layerId);
      
      if (layerIndex !== -1) {
        state.axisAlignment.layers[layerIndex].elements.push(elementId);
      }
    },
    
    // Remove an element from an axis layer
    removeElementFromLayer: (state, action: PayloadAction<{ layerId: string, elementId: string }>) => {
      const { layerId, elementId } = action.payload;
      
      const layerIndex = state.axisAlignment.layers.findIndex(layer => layer.id === layerId);
      
      if (layerIndex !== -1) {
        state.axisAlignment.layers[layerIndex].elements = 
          state.axisAlignment.layers[layerIndex].elements.filter(id => id !== elementId);
      }
    },
    
    // Set the current context
    setContext: (state, action: PayloadAction<Context>) => {
      state.currentContext = action.payload;
      
      // Record this as a relevance event
      const event: RelevanceEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: RelevanceEventType.CONTEXT_CHANGE,
        description: `Context changed to ${action.payload.domain}`,
        polarityBalanceBefore: state.currentPolarityBalance,
        polarityBalanceAfter: state.currentPolarityBalance, // No immediate change in polarity balance
        impact: 0.7 // Context changes typically have high impact
      };
      
      state.relevanceHistory = [event, ...state.relevanceHistory];
    },
    
    // Set the current solution
    setSolution: (state, action: PayloadAction<RelevantSolution>) => {
      state.currentSolution = action.payload;
      
      // Record this as a relevance event
      const event: RelevanceEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: RelevanceEventType.SOLUTION_DISCOVERY,
        description: `Solution discovered with relevance score ${action.payload.relevanceScore}`,
        polarityBalanceBefore: state.currentPolarityBalance,
        polarityBalanceAfter: action.payload.polarityBalance, // Solution may suggest new polarity balance
        impact: action.payload.relevanceScore // Impact is based on relevance score
      };
      
      state.relevanceHistory = [event, ...state.relevanceHistory];
      
      // Update polarity balance based on solution
      state.currentPolarityBalance = action.payload.polarityBalance;
    },
    
    // Set suggested polarity adjustments
    setSuggestedAdjustments: (state, action: PayloadAction<PolarityAdjustment[]>) => {
      state.suggestedAdjustments = action.payload;
    },
    
    // Apply a suggested adjustment
    applyAdjustment: (state, action: PayloadAction<string>) => {
      const adjustmentId = action.payload;
      const adjustment = state.suggestedAdjustments.find(adj => adj.polarityName === adjustmentId);
      
      if (adjustment) {
        // Update the specific polarity
        state.currentPolarityBalance = {
          ...state.currentPolarityBalance,
          [adjustment.polarityName]: adjustment.suggestedValue
        };
        
        // Record this as a relevance event
        const event: RelevanceEvent = {
          id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          type: RelevanceEventType.POLARITY_ADJUSTMENT,
          description: `Applied suggested adjustment to ${adjustment.polarityName}`,
          polarityBalanceBefore: {
            ...state.currentPolarityBalance,
            [adjustment.polarityName]: adjustment.currentValue
          },
          polarityBalanceAfter: state.currentPolarityBalance,
          impact: adjustment.impact
        };
        
        state.relevanceHistory = [event, ...state.relevanceHistory];
        
        // Remove the applied adjustment from suggestions
        state.suggestedAdjustments = state.suggestedAdjustments.filter(
          adj => adj.polarityName !== adjustmentId
        );
      }
    },
    
    // Add a relevance event
    addRelevanceEvent: (state, action: PayloadAction<Omit<RelevanceEvent, 'id' | 'timestamp'>>) => {
      const { type, description, polarityBalanceBefore, polarityBalanceAfter, impact } = action.payload;
      
      const newEvent: RelevanceEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type,
        description,
        polarityBalanceBefore,
        polarityBalanceAfter,
        impact
      };
      
      state.relevanceHistory = [newEvent, ...state.relevanceHistory];
      
      // Limit history size to prevent memory issues
      if (state.relevanceHistory.length > 100) {
        state.relevanceHistory = state.relevanceHistory.slice(0, 100);
      }
    },
    
    // Set user input
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    
    // Set response
    setResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
    
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Reset the framework
    reset: (state) => {
      return initialState;
    }
  }
});

// Export actions and reducer
export const relevanceRealizationActions = relevanceRealizationSlice.actions;
export default relevanceRealizationSlice.reducer;
