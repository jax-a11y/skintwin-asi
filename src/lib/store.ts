import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import reducers once they're created
// import agentReducer from '@/agents/agentSlice';
// import workbenchReducer from '@/lib/workbenchSlice';

// Create the root reducer
export const store = configureStore({
  reducer: {
    // agents: agentReducer,
    // workbench: workbenchReducer,
    // Add other reducers as they're created
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific paths
        ignoredActions: ['agents/setAgentState'],
        ignoredPaths: ['agents.deepTreeEcho.simulation', 'agents.marduk.recursiveFeedback'],
      },
    }),
});

// Export types for Redux usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
