import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PLinguaMembraneAgent,
  PSystemModel,
  SimulationResult,
  Module,
  PSystemType,
  FormatType,
  Optimization
} from './interfaces';

// Define the initial state for the PLingua Membrane agent
interface PLinguaMembraneState {
  isInitialized: boolean;
  isActive: boolean;
  activeModel: PSystemModel | null;
  simulationResults: SimulationResult | null;
  moduleLibrary: Module[];
  currentFormat: FormatType;
  userInput: string;
  response: string;
  error: string | null;
  isSimulating: boolean;
}

const initialState: PLinguaMembraneState = {
  isInitialized: false,
  isActive: false,
  activeModel: null,
  simulationResults: null,
  moduleLibrary: [],
  currentFormat: FormatType.PLINGUA,
  userInput: '',
  response: '',
  error: null,
  isSimulating: false
};

// Create the PLingua Membrane slice
const plinguaMembraneSlice = createSlice({
  name: 'plinguaMembrane',
  initialState,
  reducers: {
    // Initialize the agent
    initialize: (state, action: PayloadAction<{ initialModel?: PSystemModel, moduleLibrary?: Module[] }>) => {
      const { initialModel, moduleLibrary } = action.payload;
      
      state.isInitialized = true;
      if (initialModel) state.activeModel = initialModel;
      if (moduleLibrary) state.moduleLibrary = moduleLibrary;
      
      state.error = null;
    },
    
    // Set the active state of the agent
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    
    // Set the active model
    setActiveModel: (state, action: PayloadAction<PSystemModel>) => {
      state.activeModel = action.payload;
      // Reset simulation results when changing models
      state.simulationResults = null;
    },
    
    // Update the active model
    updateActiveModel: (state, action: PayloadAction<Partial<PSystemModel>>) => {
      if (state.activeModel) {
        state.activeModel = {
          ...state.activeModel,
          ...action.payload
        };
        // Reset simulation results when updating model
        state.simulationResults = null;
      }
    },
    
    // Set simulation results
    setSimulationResults: (state, action: PayloadAction<SimulationResult>) => {
      state.simulationResults = action.payload;
      state.isSimulating = false;
    },
    
    // Start simulation
    startSimulation: (state) => {
      state.isSimulating = true;
      state.error = null;
    },
    
    // Add a module to the library
    addModule: (state, action: PayloadAction<Module>) => {
      state.moduleLibrary.push(action.payload);
    },
    
    // Remove a module from the library
    removeModule: (state, action: PayloadAction<string>) => {
      state.moduleLibrary = state.moduleLibrary.filter(
        module => module.id !== action.payload
      );
    },
    
    // Set the current format
    setCurrentFormat: (state, action: PayloadAction<FormatType>) => {
      state.currentFormat = action.payload;
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
      state.isSimulating = false;
    },
    
    // Reset the agent
    reset: (state) => {
      return initialState;
    }
  }
});

// Export actions and reducer
export const plinguaMembraneActions = plinguaMembraneSlice.actions;
export default plinguaMembraneSlice.reducer;
