import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  DeepTreeEchoAgent, 
  Thought, 
  DTESimulationState
} from './interfaces';
import { PrimeCompositeStructure, VisualizationData } from './types';

// Define the initial state for the Deep Tree Echo agent
interface DeepTreeEchoState {
  isInitialized: boolean;
  agent: DeepTreeEchoAgent | null;
  thoughts: Thought[];
  currentThought: Thought | null;
  primeStructures: PrimeCompositeStructure[];
  visualizationData: VisualizationData | null;
  simulationState: DTESimulationState;
  noveltyThreshold: number;
  patternRecognitionActive: boolean;
}

// Initial state
const initialState: DeepTreeEchoState = {
  isInitialized: false,
  agent: null,
  thoughts: [],
  currentThought: null,
  primeStructures: [],
  visualizationData: null,
  simulationState: DTESimulationState.RECURSIVE_EXPANSION,
  noveltyThreshold: 0.7,
  patternRecognitionActive: false
};

// Create the slice
export const deepTreeEchoSlice = createSlice({
  name: 'deepTreeEcho',
  initialState,
  reducers: {
    initialize: (state) => {
      state.isInitialized = true;
      state.agent = {
        id: 'deep-tree-echo-1',
        name: 'Deep Tree Echo',
        status: 'active',
        noveltyDetection: {
          threshold: state.noveltyThreshold,
          active: true
        },
        patternRecognition: {
          active: state.patternRecognitionActive,
          patterns: []
        }
      };
      state.simulationState = DTESimulationState.RECURSIVE_EXPANSION;
    },
    addThought: (state, action: PayloadAction<Thought>) => {
      state.thoughts.push(action.payload);
      state.currentThought = action.payload;
    },
    setCurrentThought: (state, action: PayloadAction<Thought>) => {
      state.currentThought = action.payload;
    },
    addPrimeStructure: (state, action: PayloadAction<PrimeCompositeStructure>) => {
      state.primeStructures.push(action.payload);
    },
    updateVisualizationData: (state, action: PayloadAction<VisualizationData>) => {
      state.visualizationData = action.payload;
    },
    setSimulationState: (state, action: PayloadAction<DTESimulationState>) => {
      state.simulationState = action.payload;
    },
    setNoveltyThreshold: (state, action: PayloadAction<number>) => {
      state.noveltyThreshold = action.payload;
      if (state.agent) {
        state.agent.noveltyDetection.threshold = action.payload;
      }
    },
    togglePatternRecognition: (state) => {
      state.patternRecognitionActive = !state.patternRecognitionActive;
      if (state.agent) {
        state.agent.patternRecognition.active = state.patternRecognitionActive;
      }
    }
  }
});

// Export actions and reducer
export const {
  initialize,
  addThought,
  setCurrentThought,
  addPrimeStructure,
  updateVisualizationData,
  setSimulationState,
  setNoveltyThreshold,
  togglePatternRecognition
} = deepTreeEchoSlice.actions;

export default deepTreeEchoSlice.reducer;
