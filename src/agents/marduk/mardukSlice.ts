import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  MardukAgent,
  SubsystemType,
  SystemArchitecture,
  Subsystem,
  SubsystemState,
  FeedbackLoop,
  LeveragePoint,
  Pattern
} from './interfaces';

// Define the initial state for the Marduk agent
interface MardukState {
  isInitialized: boolean;
  isActive: boolean;
  currentArchitecture: SystemArchitecture | null;
  subsystemStates: Record<SubsystemType, SubsystemState>;
  recursiveFeedbackLoops: FeedbackLoop[];
  leveragePoints: LeveragePoint[];
  recognizedPatterns: Pattern[];
  userInput: string;
  response: string;
  error: string | null;
}

// Initial subsystem state
const initialSubsystemState: SubsystemState = {
  active: false,
  performance: 0.5,
  load: 0,
  integrity: 1,
  adaptability: 0.5
};

const initialState: MardukState = {
  isInitialized: false,
  isActive: false,
  currentArchitecture: null,
  subsystemStates: {
    [SubsystemType.MEMORY]: { ...initialSubsystemState },
    [SubsystemType.TASK]: { ...initialSubsystemState },
    [SubsystemType.AI]: { ...initialSubsystemState },
    [SubsystemType.AUTONOMY]: { ...initialSubsystemState }
  },
  recursiveFeedbackLoops: [],
  leveragePoints: [],
  recognizedPatterns: [],
  userInput: '',
  response: '',
  error: null
};

// Create the Marduk slice
const mardukSlice = createSlice({
  name: 'marduk',
  initialState,
  reducers: {
    // Initialize the agent
    initialize: (state, action: PayloadAction<{ architecture?: SystemArchitecture }>) => {
      const { architecture } = action.payload;
      
      state.isInitialized = true;
      if (architecture) state.currentArchitecture = architecture;
      
      // Reset to initial state
      state.subsystemStates = {
        [SubsystemType.MEMORY]: { ...initialSubsystemState },
        [SubsystemType.TASK]: { ...initialSubsystemState },
        [SubsystemType.AI]: { ...initialSubsystemState },
        [SubsystemType.AUTONOMY]: { ...initialSubsystemState }
      };
      state.recursiveFeedbackLoops = [];
      state.leveragePoints = [];
      state.recognizedPatterns = [];
      state.error = null;
    },
    
    // Set the active state of the agent
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    
    // Update the system architecture
    updateArchitecture: (state, action: PayloadAction<Partial<SystemArchitecture>>) => {
      if (!state.currentArchitecture) {
        state.currentArchitecture = action.payload as SystemArchitecture;
      } else {
        state.currentArchitecture = { 
          ...state.currentArchitecture, 
          ...action.payload 
        };
      }
    },
    
    // Update a subsystem state
    updateSubsystemState: (state, action: PayloadAction<{ type: SubsystemType, state: Partial<SubsystemState> }>) => {
      const { type, state: subsystemState } = action.payload;
      
      state.subsystemStates[type] = {
        ...state.subsystemStates[type],
        ...subsystemState
      };
    },
    
    // Add a feedback loop
    addFeedbackLoop: (state, action: PayloadAction<FeedbackLoop>) => {
      state.recursiveFeedbackLoops.push(action.payload);
    },
    
    // Remove a feedback loop
    removeFeedbackLoop: (state, action: PayloadAction<string>) => {
      state.recursiveFeedbackLoops = state.recursiveFeedbackLoops.filter(
        loop => loop.id !== action.payload
      );
    },
    
    // Add a leverage point
    addLeveragePoint: (state, action: PayloadAction<LeveragePoint>) => {
      state.leveragePoints.push(action.payload);
    },
    
    // Remove a leverage point
    removeLeveragePoint: (state, action: PayloadAction<string>) => {
      state.leveragePoints = state.leveragePoints.filter(
        point => point.id !== action.payload
      );
    },
    
    // Add a recognized pattern
    addPattern: (state, action: PayloadAction<Pattern>) => {
      state.recognizedPatterns.push(action.payload);
    },
    
    // Remove a recognized pattern
    removePattern: (state, action: PayloadAction<string>) => {
      state.recognizedPatterns = state.recognizedPatterns.filter(
        pattern => pattern.id !== action.payload
      );
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
    
    // Reset the agent
    reset: (state) => {
      return initialState;
    }
  }
});

// Export actions and reducer
export const mardukActions = mardukSlice.actions;
export default mardukSlice.reducer;
