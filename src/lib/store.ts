import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import skincareReducer from './shopify/skincareSlice';
import deepTreeEchoReducer from '../agents/deepTreeEcho/deepTreeEchoSlice';
import mardukReducer from '../agents/marduk/mardukSlice';

// Create the root reducer
export const store = configureStore({
  reducer: {
    skincare: skincareReducer,
    deepTreeEcho: deepTreeEchoReducer,
    marduk: mardukReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['agents/setAgentState'],
        ignoredPaths: ['deepTreeEcho.simulation', 'marduk.recursiveFeedback'],
      },
    }),
});

// Export types for Redux usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
